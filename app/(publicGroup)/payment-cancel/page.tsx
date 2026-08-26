export default function PaymentCancelPage(){

  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="p-10 rounded-xl shadow text-center">

        <h1 className="text-3xl font-bold text-red-600">
          Payment Cancelled ❌
        </h1>

        <p className="mt-4">
          Your payment was cancelled. You can try again.
        </p>

      </div>

    </div>
  );

}