#!/usr/bin/env node

/**
 * Saudi iPhone Deal Finder - Skill Validator
 * No dependencies required. Run with: node validator.js
 */

const fs = require('fs');
const path = require('path');

// Color output for terminal
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function validate() {
  log('\n🔍 Saudi iPhone Deal Finder - Skill Validator', 'cyan');
  log('='.repeat(60), 'cyan');

  const skillPath = path.join(__dirname, 'SKILL.md');
  const readmePath = path.join(__dirname, 'README.md');

  let passed = 0;
  let failed = 0;

  // Check 1: Files exist
  log('\n✓ Checking file existence...', 'blue');
  
  if (!fs.existsSync(skillPath)) {
    log('  ✗ SKILL.md not found', 'red');
    failed++;
  } else {
    log('  ✓ SKILL.md found', 'green');
    passed++;
  }

  if (!fs.existsSync(readmePath)) {
    log('  ✗ README.md not found', 'red');
    failed++;
  } else {
    log('  ✓ README.md found', 'green');
    passed++;
  }

  // Check 2: Read and validate SKILL.md content
  log('\n✓ Validating SKILL.md structure...', 'blue');

  let skillContent = '';
  try {
    skillContent = fs.readFileSync(skillPath, 'utf8');
    log('  ✓ SKILL.md readable', 'green');
    passed++;
  } catch (err) {
    log(`  ✗ Could not read SKILL.md: ${err.message}`, 'red');
    failed++;
    return report(passed, failed);
  }

  // Check 3: Validate key sections
  log('\n✓ Validating required sections...', 'blue');

  const requiredSections = [
    { name: 'Mission', marker: '## Mission' },
    { name: 'Market scope', marker: '## Market scope' },
    { name: 'Required behavior', marker: '## Required behavior' },
    { name: 'Saudi second-hand safety checks', marker: '## Saudi second-hand safety checks' },
    { name: 'Deal scoring', marker: '## Deal scoring' },
    { name: 'Output format', marker: '## Output format' },
    { name: 'Language and tone', marker: '## Language and tone' }
  ];

  requiredSections.forEach(section => {
    if (skillContent.includes(section.marker)) {
      log(`  ✓ Section: ${section.name}`, 'green');
      passed++;
    } else {
      log(`  ✗ Missing section: ${section.name}`, 'red');
      failed++;
    }
  });

  // Check 4: Validate key safety instructions
  log('\n✓ Validating safety check coverage...', 'blue');

  const safetyChecks = [
    { name: 'IMEI verification', keyword: 'IMEI' },
    { name: 'Activation Lock check', keyword: 'Activation Lock' },
    { name: 'Battery health check', keyword: 'Battery Health' },
    { name: 'Carrier compatibility', keyword: 'carrier' },
    { name: 'Physical inspection', keyword: 'Face ID' },
    { name: 'Meet in safe location', keyword: 'safe public location' }
  ];

  safetyChecks.forEach(check => {
    if (skillContent.toLowerCase().includes(check.keyword.toLowerCase())) {
      log(`  ✓ Safety check: ${check.name}`, 'green');
      passed++;
    } else {
      log(`  ✗ Missing: ${check.name}`, 'red');
      failed++;
    }
  });

  // Check 5: Validate Saudi Arabia context
  log('\n✓ Validating Saudi Arabia market context...', 'blue');

  const saudiMarketTerms = [
    { name: 'SAR currency', keyword: 'SAR' },
    { name: 'Saudi marketplace references', keyword: 'Haraj' },
    { name: 'Saudi network carriers', keyword: 'STC' }
  ];

  saudiMarketTerms.forEach(term => {
    if (skillContent.includes(term.keyword)) {
      log(`  ✓ ${term.name}`, 'green');
      passed++;
    } else {
      log(`  ✗ Missing: ${term.name}`, 'red');
      failed++;
    }
  });

  // Check 6: Validate price comparison logic
  log('\n✓ Validating pricing and deal scoring...', 'blue');

  const scoringChecks = [
    { name: 'Deal scoring model', keyword: 'Score each candidate' },
    { name: 'Price comparison rules', keyword: '## Price comparison rules' },
    { name: 'Risk penalties', keyword: 'risk penalties' },
    { name: 'Score labels', keyword: 'Strong buy' }
  ];

  scoringChecks.forEach(check => {
    if (skillContent.includes(check.keyword)) {
      log(`  ✓ ${check.name}`, 'green');
      passed++;
    } else {
      log(`  ✗ Missing: ${check.name}`, 'red');
      failed++;
    }
  });

  // Check 7: Validate output format
  log('\n✓ Validating output format...', 'blue');

  const outputChecks = [
    { name: 'Table format', keyword: '| Rank |' },
    { name: 'Best matches section', keyword: '### Best matches' },
    { name: 'Verification checklist', keyword: '### Verification checklist' },
    { name: 'Negotiation guidance', keyword: '### Negotiation guidance' }
  ];

  outputChecks.forEach(check => {
    if (skillContent.includes(check.keyword)) {
      log(`  ✓ ${check.name}`, 'green');
      passed++;
    } else {
      log(`  ✗ Missing: ${check.name}`, 'red');
      failed++;
    }
  });

  // Check 8: Line count and completeness
  log('\n✓ Validating skill completeness...', 'blue');

  const lineCount = skillContent.split('\n').length;
  if (lineCount > 100) {
    log(`  ✓ Skill is comprehensive (${lineCount} lines)`, 'green');
    passed++;
  } else {
    log(`  ⚠ Skill is short (${lineCount} lines) - may be incomplete`, 'yellow');
  }

  // Final report
  report(passed, failed);
}

function report(passed, failed) {
  log('\n' + '='.repeat(60), 'cyan');
  log(`\n📊 Validation Results:`, 'cyan');
  log(`   ✓ Passed: ${passed}`, 'green');
  log(`   ✗ Failed: ${failed}`, failed > 0 ? 'red' : 'green');
  
  const total = passed + failed;
  const percentage = Math.round((passed / total) * 100);
  
  log(`   Coverage: ${percentage}%\n`, percentage >= 80 ? 'green' : percentage >= 60 ? 'yellow' : 'red');

  if (failed === 0) {
    log('🎉 All checks passed! Skill is ready to use.', 'green');
    log('\n📌 Next steps:', 'blue');
    log('   1. Copy SKILL.md content into your ChatGPT custom instruction', 'reset');
    log('   2. Test with: "Find me the best used iPhone 13, 256GB, under 2000 SAR"', 'reset');
    log('   3. Verify it compares prices, checks safety, and scores deals', 'reset');
    process.exit(0);
  } else {
    log('⚠️  Some checks failed. Review the skill before deploying.', 'yellow');
    process.exit(1);
  }
}

// Run validation
validate();
