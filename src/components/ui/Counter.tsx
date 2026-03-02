import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

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

    const displayValue = useTransform(motionValue, (latest) =>
        `${prefix}${Math.floor(latest).toLocaleString()}${suffix}`
    );

    useEffect(() => {
        const timer = setTimeout(() => {
            const controls = animate(motionValue, targetNumber, {
                duration: 2,
                ease: "easeOut",
            });
            return () => controls.stop();
        }, 500);
        return () => clearTimeout(timer);
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
