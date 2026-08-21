import React, { useEffect, useState, useRef } from 'react';

interface AnimatedCounterProps {
  value: string | number;
  duration?: number;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1800,
  className = ''
}) => {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const elementRef = useRef<HTMLSpanElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          startCounting();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [value, hasAnimated]);

  const startCounting = () => {
    const strVal = String(value);
    
    // Extract numeric portion and prefix/suffix
    const match = strVal.match(/^([^\d]*)([\d,.]+)(.*)$/);
    if (!match) {
      setDisplayValue(strVal);
      return;
    }

    const prefix = match[1] || '';
    const numericStr = match[2].replace(/,/g, '');
    const suffix = match[3] || '';
    const targetNumber = parseFloat(numericStr);

    if (isNaN(targetNumber)) {
      setDisplayValue(strVal);
      return;
    }

    const isFloat = numericStr.includes('.');
    const decimals = isFloat ? numericStr.split('.')[1].length : 0;
    const startTime = performance.now();

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic curve for natural decelerating finish
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentNumber = targetNumber * easeOut;

      const formatted = isFloat 
        ? currentNumber.toFixed(decimals) 
        : Math.round(currentNumber).toLocaleString();

      setDisplayValue(`${prefix}${formatted}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setDisplayValue(strVal);
      }
    };

    requestAnimationFrame(updateCount);
  };

  return (
    <span ref={elementRef} className={`inline-block ${className}`}>
      {hasAnimated ? displayValue : '0'}
    </span>
  );
};
