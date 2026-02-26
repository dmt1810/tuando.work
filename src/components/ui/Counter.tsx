import { motion, useSpring, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

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

    const spring = useSpring(0, {
        mass: 1,
        stiffness: 45,
        damping: 15,
    });

    const displayValue = useTransform(spring, (latest) =>
        `${prefix}${Math.floor(latest).toLocaleString()}${suffix}`
    );

    useEffect(() => {
        const timer = setTimeout(() => spring.set(targetNumber), 500);
        return () => clearTimeout(timer);
    }, [targetNumber, spring]);

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
