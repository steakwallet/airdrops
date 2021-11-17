export function Email() {
  return (
    <div className="bg-white">
      <div className="relative py-8">
        <div className="mx-auto max-w-md sm:max-w-3xl lg:max-w-7xl px-4 md:px-0">
          <div className="relative rounded-2xl px-6 py-10 bg-gradient-to-r from-pink-400 to-pink-600 overflow-hidden shadow-xl sm:px-12 sm:py-20">
            <div className="relative">
              <div className="sm:text-center">
                <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                  Get notified of new airdrops
                </h2>
                <p className="mt-6 mx-auto max-w-2xl text-lg text-gray-100">
                  {`Submit your email below and we'll let you know when a new drop
                  happens`}
                </p>
              </div>

              <form
                action="https://steakwallet.us6.list-manage.com/subscribe/post?u=da67dab58b6db2d982767e334&amp;id=285a3fd370"
                className="mt-12 sm:mx-auto sm:max-w-lg sm:flex"
                method="post"
                id="mc-embedded-subscribe-form"
                name="mc-embedded-subscribe-form"
                target="_blank"
                noValidate
              >
                {/* <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups--> */}
                <div
                  style={{ position: "absolute", left: "-5000px" }}
                  aria-hidden="true"
                >
                  <input
                    type="text"
                    name="b_da67dab58b6db2d982767e334_95f97e6dae"
                    tabIndex={-1}
                    value=""
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <label htmlFor="cta-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="EMAIL"
                    id="mce-EMAIL"
                    className="block w-full border border-transparent rounded-md px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-3">
                  <button
                    type="submit"
                    value="Subscribe"
                    name="subscribe"
                    id="mc-embedded-subscribe"
                    className="block w-full rounded-md border border-transparent px-5 py-3 bg-white text-base font-medium text-pink-500 shadow hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:px-10 transition"
                  >
                    Notify me
                  </button>
                </div>
              </form>
              <div className="flex items-center justify-center pt-8">
                <a
                  href="https://github.com/AlexBHarley/airdrops/issues/new/choose"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white underline"
                >
                  Want to register your airdrop?
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
