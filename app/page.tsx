"use client"

import { format } from "date-fns"
import useFetch, { serialize, setQueryParams } from "http-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { BiCopy } from "react-icons/bi"
import { IoLogoGithub } from "react-icons/io"
import { useObject } from "react-kuh"
import CopyableText from "./copyable-text"
import { BsArrowUp } from "react-icons/bs"
import { store } from "atomic-state"

function searchFormatDate(dt: string | Date) {
  return format(new Date(dt), "yyyy-MM-dd")
}

const useSearch = store({
  key: "search",
  default: {
    query: "",
    dateStart: "",
    dateEnd: "",
    filetypes: [
      {
        type: "PDF",
        include: false,
      },
      {
        type: "DOC",
        include: false,
      },
      {
        type: "DOCX",
        include: false,
      },
      {
        type: "XLS",
        include: false,
      },
      {
        type: "XLSX",
        include: false,
      },
      {
        type: "PPT",
        include: false,
      },
      {
        type: "PPTX",
        include: false,
      },
    ],
    sites: [
      {
        url: "https://jurisprudencia.gob.sv",
        name: "Jurisprudencia",
        include: false,
      },
      {
        url: "https://www.transparencia.gob.sv",
        name: "Transparencia",
        include: false,
      },
      {
        url: "https://www.pnc.gob.sv",
        name: "PNC",
        include: false,
      },
      {
        url: "https://www.mh.gob.sv",
        name: "Ministerio de Hacienda",
        include: false,
      },
      {
        url: "https://www.mtps.gob.sv",
        name: "Ministerio de Trabajo",
        include: false,
      },
      {
        url: "https://www.mop.gob.sv",
        name: "Ministerio de Obras Públicas",
        include: false,
      },
      {
        url: "https://www.salud.gob.sv",
        name: "Ministerio de Salud",
        include: false,
      },
      {
        url: "https://www.mag.gob.sv",
        name: "Ministerio de Agricultura y Ganadería",
        include: false,
      },
      {
        url: "https://fuerzaarmada.mil.sv",
        name: "Ministerio de la Defensa Nacional",
        include: false,
      },
      {
        url: "https://ambiente.gob.sv",
        name: "Ministerio de Medio Ambiente y Recursos Naturales",
        include: false,
      },
      {
        url: "https://www.cultura.gob.sv",
        name: "Ministerio de Cultura",
        include: false,
      },
      {
        url: "https://www.economia.gob.sv",
        name: "Ministerio de Economía",
        include: false,
      },
      {
        url: "https://www.mitur.gob.sv",
        name: "Ministerio de Turismo",
        include: false,
      },
      {
        url: "https://www.mined.gob.sv",
        name: "Ministerio de Educación",
        include: false,
      },
      {
        url: "https://www.rree.gob.sv",
        name: "Ministerio de Relaciones Exteriores",
        include: false,
      },
      {
        url: "https://www.gobernacion.gob.sv",
        name: "Ministerio de Gobernación y Desarrollo Territorial",
        include: false,
      },
      {
        url: "https://www.seguridad.gob.sv",
        name: "Ministerio de Justicia y Seguridad Pública",
        include: false,
      },
      {
        url: "https://www.vivienda.gob.sv",
        name: "Ministerio de Vivienda",
        include: false,
      },
    ],
  },
})

export default function Home() {
  const search = useSearch()

  const searchQuery = [
    search.query,
    search.filetypes
      .filter((filetype) => filetype.include)
      .map((filetype) => `filetype:${filetype.type}`)
      .join(" OR "),
    search.sites
      .filter((site) => site.include)
      .map((site) => `site:${site.url}`)
      .join(" OR "),
    search.dateEnd ? `before:${search.dateEnd}` : "",
    search.dateStart ? `after:${search.dateStart}` : "",
  ].join(" ")

  useEffect(() => {
    setActiveSearch(false)
  }, [serialize(search)])

  const [activeSearch, setActiveSearch] = useState(false)

  const newSearchUrl = setQueryParams("https://www.google.com/search", {
    igu: 1,
    q: searchQuery,
  })

  const startSearch = () => {
    setActiveSearch(true)

    setTimeout(() => {
      document.querySelector("#search-frame")?.scrollIntoView({
        behavior: "smooth",
      })
    }, 500)
  }

  return (
    <main className="p-4">
      <Link
        href="https://github.com/danybeltran/public-elsalvador-information"
        target="_blank"
        className="btn btn-sm btn-neutral"
      >
        <IoLogoGithub /> View code
      </Link>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          startSearch()
        }}
        className="pt-4 space-x-2 flex"
      >
        <input
          placeholder="Buscar"
          value={search.query}
          onChange={(e) =>
            search.setPartial({
              query: e.target.value,
            })
          }
          type="text"
          className="input input-bordered w-full"
        />
        <button className="btn btn-primary" onClick={() => startSearch()}>
          Buscar
        </button>
      </form>
      <div className="space-y-2 py-4">
        <h2 className="font-bold text-lg">Buscar en:</h2>
        <div className="flex flex-wrap gap-2">
          {search.sites.map((site) => (
            <div key={"site" + site.url}>
              <button
                onClick={() => {
                  search.setPartial({
                    sites: search.sites.map(($site) =>
                      $site.name === site.name
                        ? {
                            ...$site,
                            include: !$site.include,
                          }
                        : $site
                    ),
                  })
                }}
                className={`btn ${
                  site.include ? "btn-primary" : "btn-outline"
                }`}
              >
                {site.name}
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-2 py-4">
        <h2 className="font-bold text-lg">Formatos:</h2>
        <div className="flex flex-wrap gap-2">
          {search.filetypes.map((filetype) => (
            <div key={"site" + filetype.type}>
              <button
                onClick={() => {
                  search.setPartial({
                    filetypes: search.filetypes.map(($filetype) =>
                      $filetype.type === filetype.type
                        ? {
                            ...$filetype,
                            include: !$filetype.include,
                          }
                        : $filetype
                    ),
                  })
                }}
                className={`btn ${
                  filetype.include ? "btn-primary" : "btn-outline"
                }`}
              >
                {filetype.type}
              </button>
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div className="flex gap-x-2 py-4">
        <div className="py-2 space-y-2">
          <h2 className="font-bold text-lg">Fecha de inicio:</h2>
          <input
            type="date"
            onChange={(e) => {
              search.setPartial({
                dateStart: e.target.value
                  ? searchFormatDate(e.target.value)
                  : "",
              })
              e.target.value
            }}
            className={`input input-bordered`}
          />
          <div className="flex gap-x-2"></div>
        </div>
        <div className="py-2 space-y-2">
          <h2 className="font-bold text-lg">Fecha final:</h2>
          <input
            type="date"
            value={search.dateEnd}
            onChange={(e) => {
              search.setPartial({
                dateEnd: e.target.value ? searchFormatDate(e.target.value) : "",
              })
              e.target.value
            }}
            className={`input input-bordered`}
          />
          <div className="flex gap-x-2"></div>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-bold" id="generated-search">
          Búsqueda generada:
        </h4>

        <div className="py-4 space-y-4">
          <div>
            <b>Búsqueda: </b> <CopyableText text={searchQuery} />
          </div>

          <div>
            <b>URL: </b> <CopyableText text={newSearchUrl} />
          </div>
        </div>
      </div>

      <div className="mb-16">
        <button
          className="btn btn-neutral"
          onClick={() => {
            scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }}
        >
          <BsArrowUp /> Regresar al inicio
        </button>
      </div>

      {activeSearch && (
        <iframe
          src={newSearchUrl}
          className="w-full h-[70vh]"
          id="search-frame"
        ></iframe>
      )}
    </main>
  )
}
