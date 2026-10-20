import test from 'node:test';
import assert from 'node:assert/strict';
import { createProject, genres } from '../src/templates.js';
import { countText, flowCheck } from '../src/writing.js';

test('provides all requested genres', () => { for (const genre of ['screenplay','blog','poetry','essay','children','fantasy']) assert.ok(genres[genre]); });
test('creates a copyright-safe story bible', () => { const project = createProject('fantasy', 'The Orchard'); assert.equal(project.title, 'The Orchard'); assert.match(project.originality.sourceNote, /own ideas/); assert.ok(project.sections.length); });
test('counts text and checks flow', () => { assert.equal(countText('하나 둘').characters, 4); assert.equal(flowCheck('같다. 같다.').repeated.length, 1); });

