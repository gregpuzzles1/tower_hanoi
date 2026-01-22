#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

function toPosix(p) {
  return p.replaceAll('\\', '/')
}

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8')
}

function parseBacktickPaths(line) {
  const matches = [...line.matchAll(/`([^`]+)`/g)].map((m) => m[1])
  // Heuristic: keep things that look like file paths
  return matches.filter((s) => s.includes('/') || s.includes('\\') || s.includes('.'))
}

function parseTaskLine(line) {
  // Example:
  // - [x] T012 [P] [US1] Implement top bar UI in `src/components/TopBar.vue`
  const m = line.match(/^\s*-\s*\[(?<done>[ xX])\]\s*(?<id>T\d{3})(?<rest>.*)$/)
  if (!m?.groups) return null

  const done = m.groups.done.toLowerCase() === 'x'
  const id = m.groups.id
  const rest = (m.groups.rest ?? '').trim()

  const parallel = /\[P\]/.test(rest)
  const storyMatch = rest.match(/\[(US\d+)\]/)
  const story = storyMatch ? storyMatch[1] : null

  // Remove leading markers like [P] [US1]
  const description = rest.replace(/^\s*(\[P\]\s*)?(\[US\d+\]\s*)?/i, '').trim()

  const filePaths = parseBacktickPaths(line).map(toPosix)

  return {
    id,
    done,
    parallel,
    story,
    description,
    filePaths,
    raw: line.trim(),
  }
}

function parsePhases(markdown) {
  const lines = markdown.split(/\r?\n/)

  /** @type {Array<{title: string, header: string, tasks: any[]}>} */
  const phases = []

  let current = null

  for (const line of lines) {
    const header = line.match(/^##\s+(Phase\s+\d+:[^#]+)$/)
    if (header) {
      current = { header: header[1].trim(), title: header[1].trim(), tasks: [] }
      phases.push(current)
      continue
    }

    if (!current) continue

    // Stop collecting tasks when we hit the next major section.
    if (/^##\s+Dependencies\s*&\s*Execution\s*Order\s*$/.test(line)) {
      current = null
      continue
    }

    const task = parseTaskLine(line)
    if (task) current.tasks.push(task)
  }

  return phases
}

function parseDependencies(markdown) {
  const lines = markdown.split(/\r?\n/)

  /** @type {string | null} */
  let dependencyGraph = null

  for (const line of lines) {
    const m = line.match(/^`([^`]+)`\s*$/)
    if (m && m[1].includes('→')) {
      dependencyGraph = m[1]
      break
    }
  }

  /** @type {Array<{from: string, to: string}>} */
  const edges = []
  if (dependencyGraph) {
    const nodes = dependencyGraph.split('→').map((s) => s.trim()).filter(Boolean)
    for (let i = 0; i < nodes.length - 1; i++) {
      edges.push({ from: nodes[i], to: nodes[i + 1] })
    }
  }

  return { dependencyGraph, edges }
}

function summarize(phases) {
  let total = 0
  let completed = 0
  let incomplete = 0
  let parallel = 0

  for (const phase of phases) {
    for (const t of phase.tasks) {
      total += 1
      if (t.done) completed += 1
      else incomplete += 1
      if (t.parallel) parallel += 1
    }
  }

  return { total, completed, incomplete, parallel }
}

function main() {
  const repoRoot = process.cwd()

  const inputArg = process.argv[2]
  const outputArg = process.argv[3]

  const inputPath = inputArg
    ? path.resolve(repoRoot, inputArg)
    : path.resolve(repoRoot, 'specs/001-tower-hanoi-site/tasks.md')

  if (!fs.existsSync(inputPath)) {
    console.error(`Input file not found: ${inputPath}`)
    process.exit(1)
  }

  const markdown = readText(inputPath)
  const phases = parsePhases(markdown)
  const dependencies = parseDependencies(markdown)

  const result = {
    generatedAt: new Date().toISOString(),
    inputPath: toPosix(path.relative(repoRoot, inputPath)),
    summary: summarize(phases),
    phases,
    dependencies,
  }

  const json = JSON.stringify(result, null, 2)

  if (outputArg) {
    const outPath = path.resolve(repoRoot, outputArg)
    fs.mkdirSync(path.dirname(outPath), { recursive: true })
    fs.writeFileSync(outPath, json)
    console.log(`Wrote ${toPosix(path.relative(repoRoot, outPath))}`)
  } else {
    console.log(json)
  }
}

main()
