import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

interface CounterProps {
    value: number | string;
    suffix?: string;
    className?: string;
}

const Counter = ({ value, suffix: propSuffix, className }: CounterProps) => {
    const stringValue = String(value);
    const numberMatch = stringValue.match(/(\d+[,.\d]*)/);
    const targetNumber = numberMatch ? parseFloat(numberMatch[0].replace(/,/g, '')) : 0;
    const prefix = stringValue.split(numberMatch ? numberMatch[0] : '')[0] || "";
    const suffix = propSuffix || (stringValue.split(numberMatch ? numberMatch[0] : '')[1] || "");

    const motionValue = useMotionValue(0);
    const controlsRef = useRef<{ stop: () => void } | null>(null);

    const displayValue = useTransform(motionValue, (latest) =>
        `${prefix}${Math.floor(latest).toLocaleString()}${suffix}`
    );

    useEffect(() => {
        const timer = setTimeout(() => {
            controlsRef.current = animate(motionValue, targetNumber, {
                duration: 2,
                ease: "easeOut",
            });
        }, 800);
        return () => {
            clearTimeout(timer);
            controlsRef.current?.stop();
        };
    }, [targetNumber, motionValue]);

    if (isNaN(targetNumber) || (!numberMatch && typeof value === 'string')) {
        return <span className={className}>{value} {propSuffix}</span>;
    }

    return (
        <motion.span className={className}>
            {displayValue as any}
        </motion.span>
    );
};

export default Counter;

