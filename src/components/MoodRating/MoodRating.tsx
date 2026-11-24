import React from 'react';
import mood1 from './assets/mood-1.svg';
import mood2 from './assets/mood-2.svg';
import mood3 from './assets/mood-3.svg';
import mood4 from './assets/mood-4.svg';
import mood5 from './assets/mood-5.svg';
import './MoodRating.css';

const moods = [
  { value: 1, label: 'Очень плохо', src: mood1 },
  { value: 2, label: 'Плохо', src: mood2 },
  { value: 3, label: 'Нормально', src: mood3 },
  { value: 4, label: 'Хорошо', src: mood4 },
  { value: 5, label: 'Отлично', src: mood5 },
];

export interface MoodRatingProps {
  question?: string;
  value?: number;
  onChange?: (value: number) => void;
  className?: string;
}

/** Lesson rating with five faces (Figma: «Оценка», Mood 1–5). */
export function MoodRating({ question = 'Оцените занятие', value, onChange, className }: MoodRatingProps) {
  return (
    <div className={['chiron-mood-rating', className].filter(Boolean).join(' ')}>
      <p className="chiron-mood-rating__question t-body-emphasis">{question}</p>
      <div
        className={['chiron-mood-rating__faces', value && 'has-value'].filter(Boolean).join(' ')}
        role="radiogroup"
        aria-label={question}
      >
        {moods.map((mood) => (
          <button
            key={mood.value}
            type="button"
            role="radio"
            aria-checked={value === mood.value}
            aria-label={mood.label}
            className={['chiron-mood-rating__face', value === mood.value && 'is-on'].filter(Boolean).join(' ')}
            onClick={() => onChange?.(mood.value)}
          >
            <img src={mood.src} width={32} height={32} alt="" />
          </button>
        ))}
      </div>
    </div>
  );
}
