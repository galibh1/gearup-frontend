import Link from "next/link";
import LoginForm from "../_components/LoginForm";

export default function LoginPage() {
  return (
    <main
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-linear-to-br
      from-white
      via-gray-50
      to-emerald-50
      px-4
      "
    >
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">

          <div
            className="
            mx-auto
            mb-5
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-emerald-100
            text-emerald-700
            text-2xl
            font-bold
            shadow-sm
            "
          >
            G
          </div>


          <h1
            className="
            text-4xl
            font-bold
            text-gray-900
            "
          >
            Welcome back
          </h1>


          <p
            className="
            mt-3
            text-gray-500
            "
          >
            Sign in to continue to GearUp.
          </p>


        </div>



        {/* Card */}
        <div
          className="
          rounded-3xl
          border
          border-gray-200
          bg-white
          p-8
          shadow-xl
          "
        >

          <LoginForm />


        </div>




        {/* Footer */}
        <p
          className="
          mt-8
          text-center
          text-sm
          text-gray-500
          "
        >

          Don&apos;t have an account?{" "}

          <Link
            href="/register"
            className="
            font-semibold
            text-emerald-600
            hover:text-emerald-700
            "
          >
            Sign up
          </Link>


        </p>


      </div>
    </main>
  );
}