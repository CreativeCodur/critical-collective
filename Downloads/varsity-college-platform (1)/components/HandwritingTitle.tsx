"use client";

import React, { useEffect, useRef, useState } from 'react';

interface HandwritingTitleProps {
  words: string[];
  accentColors: string[];
  highlightColor?: string;
  fontSize?: number;
  highlightPath?: string;
  highlightType?: 'z' | 'line';
  showHighlight?: boolean;
}

// SVG path for a bold, rounded-corner Z shape (like the reference image)
const FILLED_Z_PATH =
  'M40 60 Q60 40 120 40 H360 Q380 40 380 60 Q380 80 360 80 H160 Q140 80 140 100 Q140 120 160 120 H380 Q400 120 400 140 Q400 160 380 160 H60 Q40 160 40 140 Q40 120 60 120 H260 Q280 120 280 100 Q280 80 260 80 H40 Q20 80 20 60 Q20 40 40 60 Z';

// SVG for a thick, tilted line highlight
const TILTED_LINE_PATH =
  'M40 120 L480 60 L500 120 L60 180 Z';

export default function HandwritingTitle({
  words,
  accentColors,
  highlightColor = '#a2c8ff',
  fontSize = 90,
  highlightPath,
  highlightType = 'z',
  showHighlight = true,
}: HandwritingTitleProps) {
  const [internalShowHighlight, setInternalShowHighlight] = useState(false);
  const [textLengths, setTextLengths] = useState<number[]>([]);
  const textRefs = useRef<(SVGTextElement | null)[]>([]);

  // Animate text drawing, then highlight
  useEffect(() => {
    if (textRefs.current.length === words.length) {
      // Animate each word sequentially
      const lengths: number[] = [];
      textRefs.current.forEach((ref, i) => {
        if (ref) {
          const len = ref.getComputedTextLength();
          lengths.push(len);
          ref.style.strokeDasharray = `${len}`;
          ref.style.strokeDashoffset = `${len}`;
          ref.style.transition = 'none';
        }
      });
      setTextLengths(lengths);
      setTimeout(() => {
        textRefs.current.forEach((ref, i) => {
          if (ref) {
            ref.style.transition = `stroke-dashoffset 1s cubic-bezier(.4,0,.2,1) ${i * 1.1}s`;
            ref.style.strokeDashoffset = '0';
          }
        });
        // Show highlight after all words are drawn
        setTimeout(() => setInternalShowHighlight(true), words.length * 1100);
      }, 100);
    }
  }, [words]);

  // Animate highlight (Z shape or line) with scale/opacity
  const [showZ, setShowZ] = useState(false);
  useEffect(() => {
    if (internalShowHighlight) {
      setTimeout(() => setShowZ(true), 100); // slight delay after handwriting
    }
  }, [internalShowHighlight]);

  return (
    <svg
      width={520}
      height={fontSize * words.length + 100}
      viewBox={`0 0 520 ${fontSize * words.length + 100}`}
      style={{ display: 'block', overflow: 'visible', position: 'relative' }}
    >
      {/* Highlight behind text */}
      {internalShowHighlight && (
        <g style={{
          transform: showZ ? 'scale(1)' : 'scale(0.7)',
          opacity: showZ ? 0.85 : 0,
          transformOrigin: '50% 50%',
          transition: 'transform 0.7s cubic-bezier(.4,0,.2,1), opacity 0.7s cubic-bezier(.4,0,.2,1)',
        }}>
          {highlightType === 'line' ? (
            <path
              d={TILTED_LINE_PATH}
              fill={highlightColor}
              filter="url(#highlight-glow)"
              transform={`translate(0,${fontSize * 0.7}) scale(1.1,${words.length * 0.7}) rotate(-8 260 120)`}
            />
          ) : (
            <path
              d={FILLED_Z_PATH}
              fill={highlightColor}
              filter="url(#highlight-glow)"
              transform={`translate(40,${fontSize * 0.5}) scale(2.5,${words.length * 1.1})`}
            />
          )}
        </g>
      )}
      {/* Handwriting text (on top) */}
      {words.map((word, i) => (
        <text
          key={i}
          x={60}
          y={fontSize * (i + 1)}
          fontFamily="Pacifico, cursive"
          fontSize={fontSize}
          fill="none"
          stroke={accentColors[i] || '#0a1a3a'}
          strokeWidth={3}
          ref={el => { textRefs.current[i] = el; }}
          style={{
            strokeDasharray: textLengths[i] || 0,
            strokeDashoffset: textLengths[i] || 0,
            transition: 'none',
            filter: 'drop-shadow(0 2px 2px #fff8)',
          }}
        >
          {word}
        </text>
      ))}
      <defs>
        <filter id="highlight-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
} 