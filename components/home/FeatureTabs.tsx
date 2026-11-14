'use client'

import { useState } from 'react'
import Image from 'next/image'
import IPhoneFrame from '@/components/home/IPhoneFrame'

/**
 * Structure B's one feature showcase (round 4, Kush, 7:18 PM Fri 13 Nov): each
 * feature is one tab with its own words and its own real screen. Click or
 * arrow keys to move; nothing turns by itself (the first screen already does).
 * Without JavaScript the first tab shows.
 *
 * Pattern, from memory: Oura's and Linear's feature tabs (a row of named tabs
 * over one panel with a device or product shot).
 */
export type FeatureTab = { label: string; body: React.ReactNode; src: string; alt: string }

export default function FeatureTabs({ tabs, label }: { tabs: FeatureTab[]; label: string }) {
  const [on, setOn] = useState(0)
  const key = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') setOn(i => (i + 1) % tabs.length)
    if (e.key === 'ArrowLeft') setOn(i => (i - 1 + tabs.length) % tabs.length)
  }
  return (
    <div className="ft">
      <div className="ft-tabs" role="tablist" aria-label={label} onKeyDown={key}>
        {tabs.map((t, i) => (
          <button
            key={t.label}
            type="button"
            role="tab"
            id={`ft-tab-${i}`}
            aria-selected={i === on}
            aria-controls={`ft-panel-${i}`}
            tabIndex={i === on ? 0 : -1}
            onClick={() => setOn(i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div
          key={t.label}
          className="ft-panel"
          role="tabpanel"
          id={`ft-panel-${i}`}
          aria-labelledby={`ft-tab-${i}`}
          hidden={i !== on}
        >
          <div className="ft-words">{t.body}</div>
          <div className="ft-phone">
            <IPhoneFrame bare className="ft-ip">
              <Image className="ip-img" src={t.src} alt={t.alt} width={660} height={1430} sizes="250px" />
            </IPhoneFrame>
          </div>
        </div>
      ))}
    </div>
  )
}
