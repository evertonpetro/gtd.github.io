import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Info,
  Lightbulb,
  ShieldCheck,
  Target,
} from 'lucide-react'
import { useEffect, useRef } from 'react'
import { getGuideTopicById } from '../data/guideData'
import type { GuideCallout, GuideTable, GuideTopic } from '../types'
import { cn } from '@/utils/cn'

interface GuideContentProps {
  topic: GuideTopic
  onSelectTopic: (topicId: string) => void
  className?: string
}

const CalloutBox = ({ callout }: { callout: GuideCallout }) => {
  const configs = {
    info: {
      border: 'border-blue-200 bg-blue-50/60 text-blue-900',
      iconColor: 'text-blue-600',
      badge: 'Informação',
      Icon: Info,
    },
    tip: {
      border: 'border-emerald-200 bg-emerald-50/60 text-emerald-900',
      iconColor: 'text-emerald-600',
      badge: 'Dica Zen',
      Icon: Lightbulb,
    },
    warning: {
      border: 'border-amber-200 bg-amber-50/60 text-amber-900',
      iconColor: 'text-amber-600',
      badge: 'Atenção',
      Icon: AlertTriangle,
    },
    rule: {
      border: 'border-purple-200 bg-purple-50/60 text-purple-900',
      iconColor: 'text-purple-600',
      badge: 'Regra de Domínio GTD',
      Icon: ShieldCheck,
    },
  }

  const config = configs[callout.type] ?? configs.info
  const Icon = config.Icon

  return (
    <div className={cn('my-4 rounded-lg border p-4 text-xs md:text-sm', config.border)}>
      <div className="flex items-start gap-2.5">
        <Icon size={18} className={cn('mt-0.5 shrink-0', config.iconColor)} />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            {callout.title && <strong className="font-semibold">{callout.title}</strong>}
            <span className="rounded bg-white/70 px-1.5 py-0.5 text-[10px] font-medium tracking-tight">
              {config.badge}
            </span>
          </div>
          <p className="mt-1 leading-relaxed">{callout.content}</p>
        </div>
      </div>
    </div>
  )
}

const TableBox = ({ table }: { table: GuideTable }) => {
  return (
    <div className="my-4 overflow-x-auto rounded-lg border border-gray-200 shadow-2xs">
      <table className="min-w-full divide-y divide-gray-200 text-left text-xs md:text-sm">
        <thead className="bg-gray-50">
          <tr>
            {table.headers.map((header) => (
              <th key={header} className="px-3.5 py-2.5 font-semibold text-gray-700">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {table.rows.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`} className="hover:bg-gray-50/80">
              {row.map((cell, cellIndex) => (
                <td key={`cell-${cellIndex}`} className="px-3.5 py-2.5 text-gray-800">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const GuideContent = ({ topic, onSelectTopic, className }: GuideContentProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const prevTopic = topic.prevTopicId ? getGuideTopicById(topic.prevTopicId) : undefined
  const nextTopic = topic.nextTopicId ? getGuideTopicById(topic.nextTopicId) : undefined

  useEffect(() => {
    containerRef.current?.scrollTo({ top: 0, behavior: 'instant' })
  }, [topic.id])

  return (
    <div ref={containerRef} className={cn('flex-1 overflow-y-auto', className)}>
      <div className="mx-auto max-w-4xl px-4 py-6 md:px-8 md:py-8">
        {/* Metadados do Tópico */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
            {topic.category}
          </span>
          <ChevronRight size={14} className="text-gray-400" />
          <span className="rounded bg-gray-900 px-2 py-0.5 text-xs font-medium text-white">
            {topic.badge}
          </span>
        </div>

        {/* Título e Resumo */}
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
          {topic.title}
        </h1>
        <p className="mt-2 text-sm text-gray-600 md:text-base">{topic.summary}</p>

        {/* Objetivo */}
        {topic.objective && (
          <div className="mt-6 flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50/70 p-4">
            <Target size={20} className="mt-0.5 shrink-0 text-gray-700" />
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-700">Objetivo</h2>
              <p className="mt-1 text-xs text-gray-700 md:text-sm">{topic.objective}</p>
            </div>
          </div>
        )}

        {/* Diagrama Principal */}
        {topic.diagram && (
          <div className="mt-6">
            <h2 className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">
              Fluxograma Conceitual
            </h2>
            <div className="overflow-x-auto rounded-lg border border-gray-300 bg-gray-900 p-4 font-mono text-xs text-emerald-400 shadow-sm md:text-sm">
              <pre className="leading-relaxed whitespace-pre select-all">{topic.diagram}</pre>
            </div>
          </div>
        )}

        {/* Callouts do Tópico */}
        {topic.callouts?.map((callout, index) => (
          <CalloutBox key={`topic-callout-${index}`} callout={callout} />
        ))}

        {/* Tabela do Tópico */}
        {topic.table && <TableBox table={topic.table} />}

        {/* Seções de Conteúdo */}
        <div className="mt-8 flex flex-col gap-8">
          {topic.sections.map((section, sIndex) => (
            <section
              key={`section-${sIndex}`}
              className="border-t border-gray-100 pt-6 first:border-0 first:pt-0"
            >
              {section.title && (
                <h2 className="text-lg font-bold tracking-tight text-gray-900 md:text-xl">
                  {section.title}
                </h2>
              )}

              {section.description && (
                <p className="mt-2 text-xs leading-relaxed text-gray-600 md:text-sm">
                  {section.description}
                </p>
              )}

              {/* Passos operacionais */}
              {section.steps && section.steps.length > 0 && (
                <div className="mt-4 flex flex-col gap-3">
                  {section.steps.map((step, stepIndex) => (
                    <div
                      key={`step-${stepIndex}`}
                      className="flex items-start gap-3 rounded-md border border-gray-200/80 bg-white p-3.5 shadow-2xs"
                    >
                      {step.number !== undefined && (
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white">
                          {step.number}
                        </span>
                      )}
                      <div className="flex-1">
                        <h3 className="text-xs font-semibold text-gray-900 md:text-sm">
                          {step.title}
                        </h3>
                        <p className="mt-1 text-xs leading-relaxed text-gray-600 md:text-sm">
                          {step.description}
                        </p>
                        {step.substeps && step.substeps.length > 0 && (
                          <ul className="mt-2 flex flex-col gap-1 border-l-2 border-gray-200 pl-3">
                            {step.substeps.map((substep, subIndex) => (
                              <li
                                key={`substep-${subIndex}`}
                                className="text-xs text-gray-600 md:text-sm"
                              >
                                {substep}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Lista de itens simples */}
              {section.items && section.items.length > 0 && (
                <ul className="mt-3 flex flex-col gap-1.5 pl-4">
                  {section.items.map((item, iIndex) => (
                    <li
                      key={`item-${iIndex}`}
                      className="list-disc text-xs leading-relaxed text-gray-700 md:text-sm"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {/* Diagrama da seção */}
              {section.diagram && (
                <div className="mt-4">
                  <div className="overflow-x-auto rounded-lg border border-gray-300 bg-gray-900 p-4 font-mono text-xs text-emerald-400 shadow-sm md:text-sm">
                    <pre className="leading-relaxed whitespace-pre select-all">{section.diagram}</pre>
                  </div>
                </div>
              )}

              {/* Callouts da seção */}
              {section.callouts?.map((callout, cIndex) => (
                <CalloutBox key={`section-callout-${cIndex}`} callout={callout} />
              ))}

              {/* Tabela da seção */}
              {section.table && <TableBox table={section.table} />}
            </section>
          ))}
        </div>

        {/* Paginação de Rodapé (Anterior / Próximo) */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-gray-200 pt-6 sm:flex-row">
          {prevTopic ? (
            <button
              type="button"
              onClick={() => onSelectTopic(prevTopic.id)}
              className="flex w-full items-center gap-2 rounded-lg border border-gray-200 bg-white p-3 text-left transition hover:border-gray-400 hover:bg-gray-50 sm:w-auto"
            >
              <ArrowLeft size={16} className="text-gray-500" />
              <div>
                <span className="block text-[10px] font-medium uppercase tracking-wider text-gray-400">
                  Tópico Anterior
                </span>
                <span className="line-clamp-1 text-xs font-semibold text-gray-900">
                  {prevTopic.title}
                </span>
              </div>
            </button>
          ) : (
            <div className="hidden sm:block" />
          )}

          {nextTopic && (
            <button
              type="button"
              onClick={() => onSelectTopic(nextTopic.id)}
              className="flex w-full items-center justify-end gap-2 rounded-lg border border-gray-200 bg-white p-3 text-right transition hover:border-gray-400 hover:bg-gray-50 sm:w-auto sm:self-end"
            >
              <div>
                <span className="block text-[10px] font-medium uppercase tracking-wider text-gray-400">
                  Próximo Tópico
                </span>
                <span className="line-clamp-1 text-xs font-semibold text-gray-900">
                  {nextTopic.title}
                </span>
              </div>
              <ArrowRight size={16} className="text-gray-500" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default GuideContent
