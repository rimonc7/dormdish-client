import React, { useState } from "react";
import { FaQuoteLeft, FaArrowLeft, FaArrowRight } from "react-icons/fa";
const testimonials = [
    {
        name: "Sophia Williams",
        text: "DormDish completely transformed my travel experience! I was able to book a comfortable hotel room and enjoy amazing meals all through one platform. The convenience is unbeatable!"
    },
    {
        name: "David Brown",
        text: "As a frequent traveler, DormDish has made it so easy for me to book my stay and meals at the same time. I love that I can choose meals based on my dietary needs. The food was delicious, and the service was top-notch!"
    },
    {
        name: "Emily Johnson",
        text: "I had an amazing stay with DormDish. The hotel was cozy and affordable, and the meals were fantastic! I especially loved the variety of meal options available throughout my stay."
    },
    {
        name: "Michael Smith",
        text: "I highly recommend DormDish for anyone looking for a hassle-free experience while traveling. The combination of a great hotel and tasty meals is what makes this platform so unique."
    },
    {
        name: "Olivia Martinez",
        text: "DormDish made my trip so much easier. Booking my room and ordering meals all in one place was so convenient. The food was always fresh and delicious, and the hotel was clean and well-located."
    },
    {
        name: "Ethan Lee",
        text: "I was amazed by the seamless experience DormDish offered. I could book a room and pick my meals directly from the app. The staff at the hotel was friendly, and the food options were varied and tasty!"
    },
    {
        name: "Grace White",
        text: "As someone with dietary restrictions, I loved how DormDish catered to my needs. I could choose meals that were both healthy and delicious, and the hotel room was perfect for a relaxing stay!"
    }
];


const Testimonial = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };

    return (
        <div
            className="relative bg-cover bg-center py-20 px-6 text-white"
            style={{
                backgroundImage: "url('https://i.ibb.co.com/NWk531H/grilled-chicken-steak-vegetables-dark-wood-background.jpg')",
            }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            <div className="relative max-w-2xl mx-auto text-center z-10">
                <h2 className="text-3xl font-bold mb-6">Testimonials</h2>
                <FaQuoteLeft className="text-4xl text-accent mx-auto mb-4" />
                <p className="text-lg italic mb-6">
                    {testimonials[currentIndex].text}
                </p>
                <h3 className="text-xl font-semibold">{testimonials[currentIndex].name}</h3>
                <div className="flex justify-center gap-4 mt-6">
                    <button
                        className="btn btn-circle btn-outline text-white font-bold"
                        onClick={handlePrev}
                    >
                        <FaArrowLeft />
                    </button>
                    <button
                        className="btn btn-circle btn-outline text-white font-bold"
                        onClick={handleNext}
                    >
                        <FaArrowRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Testimonial;