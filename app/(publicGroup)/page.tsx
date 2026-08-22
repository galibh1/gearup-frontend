export default function Home() {
  return (
    <main className="min-h-screen bg-white">

      <section className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-linear-to-br
        from-white
        via-gray-50
        to-emerald-50
      ">

        <div className="text-center">

          <h1 className="
            text-5xl
            font-bold
            text-gray-900
          ">
            Welcome to GearUp
          </h1>


          <p className="
            mt-4
            text-lg
            text-gray-500
          ">
            Find the best gear for your needs.
          </p>


          <a
            href="/login"
            className="
            inline-block
            mt-8
            rounded-xl
            bg-emerald-600
            px-8
            py-3
            text-white
            font-semibold
            hover:bg-emerald-700
            transition
            "
          >
            Get Started
          </a>


        </div>

      </section>

    </main>
  );
}