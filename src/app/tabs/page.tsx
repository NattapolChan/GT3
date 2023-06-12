import { userTabs } from "@/dummydata/dummytab"

export default function Tabs() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-teal-500 sm:text-4xl">
            Your Tabs
          </h2>
          <a
            href="/tabs"
            className="mx-2 border border-gray-400 bg-transparent px-2 py-2 font-semibold text-gray-100 hover:border-teal-400 hover:text-teal-400"
          >
            Upload
          </a>
          <a
            href="/tabs"
            className="mx-2 border border-gray-400 bg-transparent px-2 py-2 font-semibold text-gray-100 hover:border-teal-400 hover:text-teal-400"
          >
            New blank
          </a>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8 border-t border-gray-200 pt-10 sm:mt-6 sm:pt-6 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {userTabs.map((eachTab) => (
            <article
              key={eachTab.id}
              className="flex max-w-xl flex-col items-start justify-between"
            >
              <div className="group relative">
                <h3 className="mt-2 text-lg font-semibold leading-6 text-teal-400 group-hover:text-gray-600">
                  <a href={eachTab.href}>
                    <span className="absolute inset-0" />
                    {eachTab.title}
                  </a>
                </h3>
              </div>
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={eachTab.datetime} className="text-gray-500">
                  {eachTab.date}
                </time>
              </div>
              <div className="flex items-center gap-x-4">
                <a href={eachTab.href}>
                  <button className="flex gap-3 border border-gray-400 bg-transparent px-2 py-2 font-semibold text-gray-100 hover:border-teal-400 hover:text-teal-400">
                    Edit
                  </button>
                </a>
                <button className="flex gap-3 border border-gray-400 bg-transparent px-2 py-2 font-semibold text-gray-100 hover:border-teal-400 hover:text-teal-400">
                  Download
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
