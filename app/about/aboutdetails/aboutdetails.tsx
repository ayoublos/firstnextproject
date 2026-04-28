'use client';
import { useRouter } from 'next/navigation';
export default function AboutDetails() {
    const navigate = useRouter();
    return (
        <button onClick={() => navigate.push('/contact')}>About Details</button>
    )
}