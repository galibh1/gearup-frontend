import { Suspense } from "react";
import PaymentSuccessContent from "./PaymentSuccessContent";

export default function PaymentSuccessPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center bg-gray-100">
                    <div className="bg-white p-10 rounded-xl shadow text-center">
                        <p className="text-gray-600">
                            Loading payment confirmation...
                        </p>
                    </div>
                </div>
            }
        >
            <PaymentSuccessContent />
        </Suspense>
    );
}