"use client"

import { format } from "date-fns"
import useFetch, { setQueryParams } from "http-react"
import Link from "next/link"
import { useState } from "react"
import { IoLogoGithub } from "react-icons/io"
import { useObject } from "react-kuh"

function searchFormatDate(dt: string | Date) {
  return format(new Date(dt), "yyyy-MM-dd")
}

export default function Home() {
  const [search, actions] = useObject({
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
  })

  const startSearch = () => {
    const newSearchUrl = setQueryParams("https://www.google.com/search", {
      igu: 1,
      q: [
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
      ].join(" "),
    })

    window.open(newSearchUrl)
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
            actions.setPartialValue({
              query: e.target.value,
            })
          }
          type="text"
          className="input input-bordered w-full"
        />
        <button className="btn btn-primary">Buscar</button>
      </form>
      <div className="space-y-2 py-4">
        <h2 className="font-bold text-lg">Buscar en:</h2>
        <div className="flex flex-wrap gap-2">
          {search.sites.map((site) => (
            <div key={"site" + site.url}>
              <button
                onClick={() => {
                  actions.setPartialValue({
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
        <div className="flex gap-x-2">
          {search.filetypes.map((filetype) => (
            <div key={"site" + filetype.type}>
              <button
                onClick={() => {
                  actions.setPartialValue({
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
              actions.setPartialValue({
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
              actions.setPartialValue({
                dateEnd: e.target.value ? searchFormatDate(e.target.value) : "",
              })
              e.target.value
            }}
            className={`input input-bordered`}
          />
          <div className="flex gap-x-2"></div>
        </div>
      </div>
    </main>
  )
}
