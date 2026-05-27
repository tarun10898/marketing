# Companies JSON Guide

This file explains what is stored in each `companies_batch_*.json` file and how to read it.

## File Pattern

- `companies/companies_batch_1.json`
- `companies/companies_batch_2.json`
- ...
- `companies/companies_batch_10.json`

Each file is a JSON array of company objects.

## Top-Level Company Object

Example (trimmed):

```json
{
  "company_name": "Qualcomm India",
  "headquarters": "San Diego, California, USA",
  "india_locations": ["Hyderabad", "Bengaluru", "Chennai"],
  "titles": [...],
  "roles": [...],
  "tier": "Tier 2",
  "company_id": "qualcomm-india",
  "data_quality": {...},
  "source_references": [...]
}
```

## Key Sections

### 1) `titles`

High-level role list and level bands, for example:

- `Software Engineer` -> `Entry`, `Mid`, `Senior`
- `Engineering Manager` -> `Manager`, `Senior Manager`, `Director`
- `Frontend Engineer` -> `Entry`, `Mid`, `Senior`

### 2) `roles`

Detailed per-role data with level-level metadata.

Each role contains:

- `title`
- `role_id`
- `levels[]`

Each level contains:

- `level`, `label`, `experience`
- `ctc_range` and `breakdown`
- `interview_process` (`rounds`, `steps`)
- `interview_process_structured`
- `compensation_normalized`
- `data_evidence`

### 3) `data_evidence`

Evidence and provenance data, including:

- `source_references[]`
- `source_type_split`
- `verification_status`
- `confidence_score_numeric`
- `interview_evidence_window`

Example source reference (trimmed):

```json
{
  "review_id": "qualcomm-india::seed-interview-1",
  "source_type": "community",
  "category": "interview_experience",
  "field": "interview_process",
  "title": "Qualcomm India interview experience seed 1",
  "url": "internal://seed/qualcomm-india/interview/1",
  "review_date": "2026-05-26",
  "tags": ["interview", "coding", "round"]
}
```

### 4) `data_quality`

Quality gate result block for the company:

- `interview_recency_gate`
- `duplicate_name_gate`
- `source_minimum_gate`
- `quality_gate_status`
- `publish_blockers`

Example status block:

```json
{
  "quality_gate_status": {
    "interview_recency": "pass",
    "unique_company_name": "pass",
    "source_minimum": "pass",
    "publish_blocked": false
  }
}
```

## Roles Currently Covered

Core coding roles:

- Software Engineer
- Software Engineer in Test (SDET/QA)
- Site Reliability Engineer (SRE)
- DevOps / Platform Reliability Engineer
- AI/ML Engineer
- Security Engineer
- Platform Engineer
- Data Engineer
- Technical Program Manager (TPM)

Tech leadership roles:

- Engineering Manager
- Staff Engineer / Principal Engineer
- Technical Architect

Specialized coding tracks:

- Frontend Engineer
- Backend Engineer
- Mobile Engineer (iOS/Android)
- MLOps Engineer
- Data Scientist
- Cloud Engineer

## How These Files Are Produced

1. Batch generator scripts (`companies/generate_batch_*.mjs`) create raw batch data.
2. Pipeline (`companies/add_tier_reason.mjs`) enriches and validates all batches.
3. Validation summary is written to `companies/quality_gate_report.json`.
4. Canonical company mapping is written to `companies/company_registry.json`.

## Related Docs

- `README.md` in this `data/` folder for end-to-end workflow and commands.
