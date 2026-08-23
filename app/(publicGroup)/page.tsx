import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">


      {/* Navbar */}
      <nav
        className="
        flex
        items-center
        justify-between
        px-8
        py-6
        max-w-7xl
        mx-auto
        "
      >

        {/* Logo */}
        <div className="flex items-center gap-3">

          <div
            className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-white
            text-black
            font-bold
            "
          >
            G
          </div>


          <span className="text-xl font-semibold">
            gearup
          </span>

        </div>



        {/* Menu */}
        <div
          className="
          hidden
          md:flex
          items-center
          gap-10
          text-sm
          text-gray-400
          "
        >

          <span>
            Browse gear
          </span>

          <span>
            How it works
          </span>

          <span>
            Why GearUp
          </span>

        </div>



        <Link
          href="/register"
          className="
          rounded-full
          border
          border-gray-700
          px-6
          py-2
          text-sm
          hover:bg-white
          hover:text-black
          transition
          "
        >
          List your gear →
        </Link>


      </nav>






      {/* Hero */}
      <section
        className="
        max-w-7xl
        mx-auto
        grid
        md:grid-cols-2
        gap-10
        items-center
        px-8
        py-20
        "
      >


        {/* Left */}
        <div>


          <div
            className="
            inline-flex
            rounded-full
            bg-[#222]
            px-4
            py-2
            text-sm
            text-gray-300
            mb-8
            "
          >
            ✨ Adventure, on your terms
          </div>



          <h1
            className="
            text-5xl
            md:text-7xl
            font-bold
            leading-tight
            "
          >
            Your next
            <br />
            adventure starts
            <br />
            with the right gear.
          </h1>




          <p
            className="
            mt-8
            max-w-xl
            text-lg
            text-gray-400
            "
          >
            Rent quality outdoor and sports equipment from people
            who know the outdoors. Less buying. More doing.
          </p>




          <div
            className="
            mt-10
            flex
            gap-5
            "
          >

            <Link
              href="/login"
              className="
              rounded-full
              bg-white
              px-8
              py-3
              text-black
              font-medium
              hover:bg-gray-200
              transition
              "
            >
              Explore gear →
            </Link>



            <button
              className="
              text-gray-300
              hover:text-white
              "
            >
              See how it works
            </button>


          </div>



        </div>





        {/* Hero Image Placeholder */}
        <div
          className="
          h-[420px]
          rounded-[40px]
          bg-gradient-to-br
          from-gray-700
          to-gray-900
          flex
          items-center
          justify-center
          overflow-hidden
          "
        >

          <div className="text-center">

            <p className="text-gray-400">
              THIS WEEK'S ESCAPE
            </p>

            <h2
              className="
              text-3xl
              font-bold
              mt-2
              "
            >
              Find your outside
            </h2>

          </div>


        </div>



      </section>








      {/* Popular Gear */}
      <section
        className="
        max-w-7xl
        mx-auto
        px-8
        py-20
        "
      >


        <p
          className="
          text-sm
          tracking-[5px]
          text-gray-400
          "
        >
          READY WHEN YOU ARE
        </p>


        <h2
          className="
          mt-5
          text-4xl
          font-bold
          "
        >
          Popular gear
        </h2>


        <p
          className="
          mt-3
          text-gray-400
          "
        >
          Everything you need. Nothing you don't.
        </p>





        <div
          className="
          mt-10
          grid
          md:grid-cols-4
          gap-6
          "
        >


          {[
            ["Mountain Bike", "$35", "Cycling"],
            ["Camping Tent", "$25", "Camping"],
            ["Hiking Backpack", "$12", "Hiking"],
            ["Dumbbell Set", "$15", "Fitness"],
          ].map((item) => (

            <div
              key={item[0]}
              className="
              rounded-3xl
              bg-[#171717]
              border
              border-gray-800
              overflow-hidden
              "
            >

              <div
                className="
                h-52
                bg-gradient-to-br
                from-gray-600
                to-gray-900
                "
              />


              <div className="p-5">


                <span
                  className="
                  rounded-full
                  bg-black
                  px-3
                  py-1
                  text-xs
                  "
                >
                  {item[2]}
                </span>



                <h3
                  className="
                  mt-5
                  text-xl
                  font-semibold
                  "
                >
                  {item[0]}
                </h3>


                <p className="text-gray-400 mt-2">
                  {item[1]} / day
                </p>


              </div>


            </div>


          ))}


        </div>



      </section>







      {/* How it works */}
      <section
        className="
        bg-[#171717]
        py-20
        px-8
        "
      >

        <div
          className="
          max-w-7xl
          mx-auto
          "
        >

          <p
            className="
            text-sm
            tracking-[5px]
            text-gray-400
            "
          >
            SIMPLE BY DESIGN
          </p>


          <h2
            className="
            text-4xl
            font-bold
            mt-5
            "
          >
            From “what if?” to out there.
          </h2>




          <div
            className="
            grid
            md:grid-cols-3
            gap-10
            mt-16
            "
          >

            {[
              ["01","Find your gear","Browse trusted equipment from local owners and choose what fits your plan."],
              ["02","Pick your dates","Select when you need it, check availability, and reserve in a few clicks."],
              ["03","Go make memories","Collect your gear and spend less time planning, more time exploring."]
            ].map((step)=>(
              
              <div key={step[0]}>

                <p className="text-5xl text-gray-700 font-bold">
                  {step[0]}
                </p>

                <h3 className="mt-8 text-2xl font-semibold">
                  {step[1]}
                </h3>

                <p className="mt-5 text-gray-400">
                  {step[2]}
                </p>

              </div>

            ))}


          </div>


        </div>


      </section>





      {/* Footer */}
      <footer
        className="
        px-8
        py-8
        flex
        justify-between
        text-gray-400
        "
      >

        <span className="font-semibold">
          gearup
        </span>


        <span>
          Rent less. Explore more.
        </span>


        <span>
          Made for the next good story.
        </span>


      </footer>



    </main>
  );
}