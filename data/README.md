# Data Pipeline Documentation

This folder contains the company dataset pipeline and generated artifacts.

## Files In This Folder

- `companies/` - all generators, enriched batch JSON files, and reports.
- `companies.md` - detailed schema guide for company JSON files, with examples.

## Main Process

1. Generate a raw batch JSON file using a generator script.
2. Run the enrichment and validation pipeline.
3. Review output artifacts (`company_registry.json` and `quality_gate_report.json`).
4. Use strict gate mode to block publish when any company fails.

## Input Files (Examples)

- `companies/generate_batch_9.mjs`
- `companies/generate_batch_10.mjs`

What these files contain:

- A `roles` template list (SWE, SDET, SRE, etc.).
- A `companies` array with company metadata (name, locations, type, preferred skills).
- Compensation/interview scaffolding logic.
- Output write call to a batch file such as:
  - `companies/companies_batch_9.json`
  - `companies/companies_batch_10.json`

## Pipeline Script

- `companies/add_tier_reason.mjs`

What this script does:

- Enriches each company and role-level with normalized fields.
- Adds tier logic and role-impact metadata.
- Adds/ensures coding + leadership role coverage.
- Computes confidence/evidence fields.
- Applies quality gates:
  - minimum sources
  - interview recency
  - unique company name (dedup)
- Writes supporting outputs:
  - `companies/company_registry.json`
  - `companies/quality_gate_report.json`

## Output Files (Examples)

### 1) Batch Data

- `companies/companies_batch_1.json` ... `companies/companies_batch_10.json`

What is written in these files:

- Company profile (`company_name`, `headquarters`, `india_locations`).
- `titles` array (role -> level bands).
- `roles` array with level-wise details:
  - `ctc_range`, `breakdown`
  - `interview_process` and `interview_process_structured`
  - `compensation_normalized`
  - `data_evidence`
- Company-level quality and governance blocks:
  - `data_quality`
  - `crowd_data_governance`
  - `source_references`

### 2) Registry

- `companies/company_registry.json`

What is written in this file:

- `total_unique_companies`
- Canonicalized names and aliases
- Occurrence list by batch file and index
- Dedup policy settings (exact/fuzzy behavior)

### 3) Quality Gate Report

- `companies/quality_gate_report.json`

What is written in this file:

- Gate policy (`min_recent_interview_reviews`, `interview_recency_days`, `min_source_references`)
- Totals (`evaluated_companies`, `failed_companies`, `unique_companies`)
- Failure details per company (if any): blocker reasons and evidence counts

## Commands

Run from project root:

```powershell
node data/companies/generate_batch_10.mjs
node data/companies/add_tier_reason.mjs
```

Strict publish enforcement:

```powershell
$env:ENFORCE_PUBLISH_GATE='1'
node data/companies/add_tier_reason.mjs
Remove-Item Env:ENFORCE_PUBLISH_GATE
```

Disable auto evidence seeding:

```powershell
$env:AUTO_SEED_EVIDENCE='0'
node data/companies/add_tier_reason.mjs
Remove-Item Env:AUTO_SEED_EVIDENCE
```

## Accuracy Notes

- The pipeline guarantees structure and gate compliance.
- Some interview/source evidence may be auto-seeded placeholders when enabled.
- Replace placeholders with verified external references for production-grade trust.
