'use client'

import { useId, useRef, useState } from 'react'
import { isValidEmail, isValidOptionalPhone } from '@/lib/constants'

type Status = 'idle' | 'loading' | 'success' | 'already' | 'error'
type FieldError = 'email' | 'phone' | null

interface SignupFormProps {
  source: string
  onSignupSuccess?: () => void
  /** Stack fields in a single column (used by the lower CTA). */
  compact?: boolean
  /** Phone is only offered on the primary hero form. */
  withPhone?: boolean
  id?: string
}

const CREAM = '#F5F0E8'
const CLAY = '#B5522A'
const TURMERIC = '#C8902A'
const STONE = '#93826F'

export default function SignupForm({
  source,
  onSignupSuccess,
  compact = false,
  withPhone = false,
  id,
}: SignupFormProps) {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [fieldError, setFieldError] = useState<FieldError>(null)
  const [serverError, setServerError] = useState('')
  // React state updates aren't guaranteed to re-render (and disable the
  // button) between two clicks fired in quick succession, so a synchronous
  // ref — not the `status` state — is what actually blocks a double-submit.
  const submittingRef = useRef(false)

  const uid = useId()
  const nameId = `${uid}-name`
  const emailId = `${uid}-email`
  const phoneId = `${uid}-phone`
  const errorId = `${uid}-error`

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (submittingRef.current) return

    // Validate locally first so bad input gets a specific message rather than
    // the generic server-error copy.
    if (!isValidEmail(email)) {
      setFieldError('email')
      setStatus('idle')
      return
    }
    if (withPhone && !isValidOptionalPhone(phone)) {
      setFieldError('phone')
      setStatus('idle')
      return
    }

    submittingRef.current = true
    setFieldError(null)
    setServerError('')
    setStatus('loading')

    // Without this, a hung beehiiv request leaves the button stuck on
    // "Joining…" forever with no way for the user to recover.
    const timeout = new AbortController()
    const timeoutId = setTimeout(() => timeout.abort(), 15_000)

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          firstName,
          phone: withPhone ? phone : '',
          source,
        }),
        signal: timeout.signal,
      })
      const data = await res.json()

      // The API answers { ok, alreadySubscribed?, error? }. An existing
      // subscriber comes back as a 200, not an error.
      if (res.ok && data.ok) {
        setStatus(data.alreadySubscribed ? 'already' : 'success')
        if (!data.alreadySubscribed) onSignupSuccess?.()
      } else {
        setServerError(typeof data.error === 'string' ? data.error : '')
        setStatus('error')
      }
    } catch (err) {
      setServerError(
        err instanceof DOMException && err.name === 'AbortError'
          ? 'That took too long. Check your connection and try again.'
          : ''
      )
      setStatus('error')
    } finally {
      clearTimeout(timeoutId)
      submittingRef.current = false
    }
  }

  if (status === 'success' || status === 'already') {
    return (
      <div
        role="status"
        aria-live="polite"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '18px 22px',
          border: `0.5px solid ${CLAY}59`,
          background: 'rgba(181,82,42,0.07)',
          borderRadius: '4px',
          animation: 'fadeUp 0.4s ease forwards',
        }}
      >
        <span
          aria-hidden="true"
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: CLAY,
            flexShrink: 0,
          }}
        />
        <span style={{ fontSize: '14px', fontWeight: 300, color: CREAM, lineHeight: 1.6 }}>
          {status === 'already'
            ? "You're already on the list. We'll be in touch soon."
            : "You're on the list. Founding pricing is yours when we launch."}
        </span>
      </div>
    )
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'Courier New, ui-monospace, SFMono-Regular, Menlo, monospace',
    fontSize: '11px',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: STONE,
    marginBottom: '7px',
  }

  return (
    <div id={id}>
      <form onSubmit={handleSubmit} noValidate>
        <div
          className="v2-form-row"
          style={{
            display: 'grid',
            gridTemplateColumns: compact ? '1fr' : '150px 1fr auto',
            gap: '10px',
            alignItems: 'end',
          }}
        >
          <div>
            <label htmlFor={nameId} style={labelStyle}>
              First name
            </label>
            <input
              id={nameId}
              className="v2-field"
              type="text"
              name="firstName"
              autoComplete="given-name"
              placeholder="Optional"
              maxLength={80}
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              disabled={status === 'loading'}
            />
          </div>

          <div>
            <label htmlFor={emailId} style={labelStyle}>
              Email address
            </label>
            <input
              id={emailId}
              className="v2-field"
              type="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              placeholder="you@email.com"
              maxLength={254}
              required
              aria-invalid={fieldError === 'email'}
              aria-describedby={fieldError ? errorId : undefined}
              value={email}
              onChange={e => {
                setEmail(e.target.value)
                if (fieldError === 'email') setFieldError(null)
              }}
              disabled={status === 'loading'}
            />
          </div>

          {!compact && (
            <button type="submit" className="v2-btn" disabled={status === 'loading'}>
              {status === 'loading' ? 'Joining…' : 'Join'}
            </button>
          )}
        </div>

        {withPhone && (
          <div style={{ marginTop: '10px' }}>
            <label htmlFor={phoneId} style={labelStyle}>
              Phone number (optional)
            </label>
            <input
              id={phoneId}
              className="v2-field"
              type="tel"
              name="phone"
              autoComplete="tel"
              inputMode="tel"
              placeholder="+1 555 123 4567"
              maxLength={32}
              aria-invalid={fieldError === 'phone'}
              aria-describedby={fieldError ? errorId : undefined}
              value={phone}
              onChange={e => {
                setPhone(e.target.value)
                if (fieldError === 'phone') setFieldError(null)
              }}
              disabled={status === 'loading'}
              style={{ maxWidth: compact ? undefined : '420px' }}
            />
          </div>
        )}

        {compact && (
          <button
            type="submit"
            className="v2-btn"
            disabled={status === 'loading'}
            style={{ marginTop: '12px', width: '100%' }}
          >
            {status === 'loading' ? 'Joining…' : 'Get early access'}
          </button>
        )}
      </form>

      {!fieldError && status !== 'error' && (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '9px', marginTop: '14px' }}>
          <span
            aria-hidden="true"
            style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: TURMERIC,
              marginTop: '6px',
              flexShrink: 0,
            }}
          />
          <span style={{ fontSize: '12px', fontWeight: 300, color: STONE, lineHeight: 1.6 }}>
            {withPhone
              ? 'First 500 founding members get permanent pricing. Launch updates by text, never shared.'
              : 'No spam. Early access only.'}
          </span>
        </div>
      )}

      <p
        id={errorId}
        role="alert"
        aria-live="polite"
        style={{
          fontSize: '13px',
          fontWeight: 300,
          lineHeight: 1.6,
          marginTop: fieldError || status === 'error' ? '14px' : 0,
          color: '#E08A62',
        }}
      >
        {fieldError === 'email' && 'That email doesn’t look right. Check for typos.'}
        {fieldError === 'phone' && 'Include your country code, e.g. +1 555 123 4567.'}
        {!fieldError &&
          status === 'error' &&
          (serverError || 'Something went wrong. Please try again.')}
      </p>
    </div>
  )
}
