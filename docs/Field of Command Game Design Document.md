**FIELD OF COMMAND**

Game Design Document

Version 2.0

Genre: Operational-Scale WWII Real-Time Strategy

Platform: PC (Windows)

Engine: Unreal Engine 5 (World Partition + Mass Entity Framework)

Mode: Single Player Campaign

Perspective: Top-down strategic (freely scalable)

# Table of Contents

1. Overview
2. Vision Statement
3. Market Positioning
4. Core Gameplay Pillars
5. Player Commander System
6. Command Hierarchy
7. Core Game Loop
8. Campaign Structure: V for Victory
9. Historical Operations Reference
10. Gameplay Systems
11. AI Command System
12. Logistics & Supply
13. Core Persistent Units
14. Historical NPC Commanders
15. World & Environment
16. Technical Architecture
17. Art Style Guide
18. MVP Scope
19. Development Roadmap

# 1. Overview

Field of Command is an operational theatre-scale, real-time WWII strategy game where players take on the role of a fictional British Army officer rising through the ranks across persistent campaigns. Starting as a Lieutenant-Colonel commanding a single battalion at Dunkirk in 1940, players progress through the war years to eventually command entire Corps by 1945.

Rather than micromanaging individual squads, the player issues operational intent through a hierarchical HQ structure. AI deputy commanders execute manoeuvre, defence, and logistics on the ground, whilst the player manages the operational picture, allocates reserves, and coordinates support assets.

Historical commanders—Montgomery, Alexander, Horrocks, Freyberg—appear as NPCs: your superiors, peers, and eventually subordinates. Your career, reputation, and the units you command persist across the entire five-year campaign.

# 2. Vision Statement

Deliver the first modern, visually and technically ambitious WWII operational RTS that allows players to experience the realities of command: frontage management, supply throughput, entrenchment, reserves, and operational tempo—not individual unit micromanagement.

### Design Pillars

- Scale: Thousands of units simulated across theatre-sized maps
- Persistence: Your commander, units, reputation, and campaign progress carry forward
- Decision over Micro: Strategic intent matters more than clicking speed
- Authenticity without Complexity: Historical grounding with accessible systems
- Player Intent → AI Execution: You command through headquarters, not individual soldiers

# 3. Market Positioning

## Target Players

- Fans of Hearts of Iron, Unity of Command, Graviteam Tactics, Combat Mission, Command Ops
- Strategy gamers who enjoy planning, manoeuvre, and logistics
- Underserved segment: high-fidelity operational RTS with modern production values
- Must be accessible: clear UI, intuitive systems, gradual complexity introduction

## Competitive Gap

No current title combines: operational depth, real-time responsiveness, large-scale theatre simulation, modern production quality, and highly accessible UX.

**Price Target:** £24.99–£29.99

# 4. Core Gameplay Pillars

## Pillar 1: Operational Command

Players define broad operational intent rather than micromanaging individual units:

- Defend: Hold current positions
- Hold: Maintain line at all costs
- Establish Fortified Lines: Dig in and prepare defenses
- Advance: Push forward along designated axis
- Breakthrough: Concentrated assault on specific sector
- Delay: Fighting withdrawal to slow enemy advance
- Withdraw: Controlled retreat to fallback positions
- Rest and Refit: Recover strength and reorganize

AI deputy commanders execute the tactical details based on their personality traits and the situation on the ground.

## Pillar 2: Logistics Defines Victory

Supply is critical and modelled with real supply and demand:

- Supply flows through nodes, roads, infrastructure, and terrain
- Depots, dumps, ports, and airstrips serve as supply hubs
- Interdiction, cut-off, and stockpile mechanics create operational drama
- Capacity depends on mobility, mechanisation, and infrastructure quality

Units degrade predictably when supply is limited. An army without supply cannot fight.

## Pillar 3: Persistence

Everything that matters persists across the campaign:

- Your commander's rank, reputation, and influence
- Core units with accumulated experience and veterancy
- Named deputy commanders with traits and history
- Terrain damage: craters, destroyed bridges, fortifications remain until repaired
- Battle scars: units remember their losses and victories

# 5. Player Commander System

Unlike games where you play as a historical figure, Field of Command casts you as a fictional British Army officer whose career spans the entire war. Historical commanders appear as NPCs—your superiors who give orders, your peers who you fight alongside, and eventually your subordinates who you command.

## Starting Position

You begin as a Lieutenant-Colonel commanding a battalion of the Durham Light Infantry, 151st Brigade, 50th (Northumbrian) Division. It is May 1940, and France is falling.

**Starting Unit:** Battalion, Durham Light Infantry (50th Northumbrian Division)

**Starting Rank:** Lieutenant-Colonel

**Starting Operation:** Dunkirk (May 26 – June 4, 1940)

## Career Progression

| **Chapter** | **Player Rank** | **Command Scope** | **Strength** |
| --- | --- | --- | --- |
| Darkest Hour (1940) | Lt-Colonel | Battalion | ~800 men |
| Crossroads (1941) | Lt-Colonel → Brigadier | Battalion → Brigade | 800 → 4,000 men |
| Turning Point (1942) | Brigadier | Brigade | ~4,000 men |
| Liberation (1943-44) | Brigadier → Maj-General | Brigade → Division | 4,000 → 15,000 men |
| Crusade (1944) | Maj-General | Division | ~15,000 men |
| Cauldron (1944-45) | Maj-General → Lt-General | Division → Corps | 15,000 → 50,000+ men |

Promotion is earned through performance, not automatic progression. Poor results mean delayed advancement, reassignment to quiet sectors, or in extreme cases, relief from command.

## Reputation & Influence

### Reputation (0-100)

How higher command views your performance.

- Gained by: Meeting objectives, efficient casualty ratios, initiative, holding under pressure
- Lost by: Failing objectives, excessive casualties, requesting too much support, poor logistics
- Effects: Promotion speed, reinforcement priority, quality of deputies assigned

### Influence (Spendable Currency)

Political capital with high command.

- Earned through: Exceptional performance, capturing key objectives, campaign victories
- Spent on: Requesting specific units, ULTRA intelligence, priority supply, air support

## Failure States

Your character can face serious consequences:

- Death: Low probability during combat, increases if HQ overrun. Campaign continues with successor.
- Capture: If surrounded without evacuation. May escape later (like O'Connor) or campaign continues with new character.
- Relief: Poor performance leads to removal from command. Reassigned to training role.
- Medical Evacuation: Wounds end your field career. Legacy continues through trained subordinates.

None of these are 'game over.' The war continues. But your personal story has real consequences.

# 6. Command Hierarchy

The British Army command structure forms the backbone of gameplay progression. Note: British cavalry and armoured 'regiments' are battalion-equivalent formations, not a separate tier.

| **Level** | **Strength** | **Commanded By** | **Subordinates** |
| --- | --- | --- | --- |
| Section | 7-12 men | Corporal/Sergeant | — |
| Platoon | 25-30 men | Lieutenant | 3 Sections |
| Company | 100-120 men | Major/Captain | 3 Platoons |
| Battalion | 500-1,000 men | Lt-Colonel | 4 Companies |
| Brigade | 3,500-5,000 men | Brigadier | 3 Battalions |
| Division | 15,000-18,000 men | Maj-General | 3 Brigades + Support |
| Corps | 2-4 Divisions | Lt-General | Multiple Divisions |
| Army | Multiple Corps | General | Multiple Corps |

### Command Progression in Game

**Battalion → Brigade → Division → Corps**

This is the player's progression path. Each tier unlocks new capabilities, larger command scope, and additional complexity.

# 7. Core Game Loop

## Phase 1: Reconnaissance

Every operation begins with fog of war. Deploy reconnaissance assets, receive intelligence from higher command, and begin building your picture of the enemy situation. Call in your first units and establish your initial headquarters.

## Phase 2: Deployment

Define command zones and orders for your units. Set up schedules, rotation plans, and operational phases. Build fortifications, establish supply depots, and prepare your logistics network. Stabilise the front.

## Phase 3: Battle

Set attack or defence lines, assign objectives, and adjust priorities as the situation develops. Your deputy commanders manoeuvre units, maintain frontage, and rotate fatigued troops. Shift reserves, reinforce threatened sectors, and coordinate support assets.

## Phase 4: Attrition

Combat grinds on. Damage accumulates. Terrain changes. You adapt to casualties, equipment losses, and supply constraints. Execute operational phases, request reinforcements from higher command, and spend influence to secure critical support.

## Phase 5: Resolution

The operation concludes in victory, defeat, or stalemate. Results, surviving units, and experience carry forward to the next operation. Your reputation adjusts based on performance. The campaign map opens for the next phase.

# 8. Campaign Structure: V for Victory

The base game campaign follows British and Commonwealth forces from the fall of France to the fall of Germany. Historical operations form the backbone, but player performance creates sandbox variation within the strategic framework.

## Chapter 1: Darkest Hour (1940)

**Operations:** Dunkirk

**Player Rank:** Lieutenant-Colonel (Battalion Command)

**Design Purpose:** Tutorial and introduction to core mechanics

France has fallen. Your battalion must survive the retreat to Dunkirk and evacuate as many men as possible. This chapter teaches defensive operations, supply under pressure, and the stakes of command.

The units and commanders who survive Dunkirk become your veteran cadre for the campaigns ahead.

## Chapter 2: Crossroads (1941)

**Operations:** Operation Compass, Greece/Crete, Siege of Tobruk, Operation Crusader

**Player Rank:** Lieutenant-Colonel → Brigadier

**Design Purpose:** Desert warfare, multi-front coordination, siege mechanics

The war expands to North Africa and the Mediterranean. Learn mobile operations in the desert, experience the desperation of Greece and Crete, endure the siege of Tobruk, and lead the relief offensive in Operation Crusader.

By chapter end, you command a brigade—three battalions under your direction.

## Chapter 3: Turning Point (1942)

**Operations:** Dieppe Raid, Second El-Alamein, Operation Torch

**Player Rank:** Brigadier

**Design Purpose:** Combined operations, set-piece offensive, amphibious landings

Dieppe is a disaster that teaches hard lessons. El-Alamein is the first decisive victory. Torch opens a second front in North Africa. The tide begins to turn.

## Chapter 4: Liberation (1943-44)

**Operations:** Tunisia, Sicily, Salerno, Anzio, Monte Cassino

**Player Rank:** Brigadier → Major-General

**Design Purpose:** Transition to divisional command, attritional warfare, amphibious operations

The final victory in Africa leads to the invasion of Italy. Sicily falls quickly, but Italy becomes a brutal slog. Cassino breaks units and commanders alike. By the end, you command a full division.

## Chapter 5: Crusade (1944)

**Operations:** Normandy, Operation Dragoon, Operation Market Garden

**Player Rank:** Major-General

**Design Purpose:** Corps-level logistics, large-scale invasion, airborne operations

D-Day and the liberation of France. Normandy is the ultimate test of combined arms warfare. Market Garden demonstrates the cost of overreach.

## Chapter 6: Cauldron (1944-45)

**Operations:** Battle of the Bulge, Operation Plunder (Rhine Crossing)

**Player Rank:** Major-General → Lieutenant-General

**Design Purpose:** Crisis response, final offensive, maximum command complexity

The Ardennes offensive tests your ability to respond to crisis. The Rhine crossing is the final barrier. You end the war commanding a Corps in the heart of Germany.

# 9. Historical Operations Reference

Each operation is based on validated historical research. The following table provides quick reference for all campaign operations.

| **Operation** | **Date** | **Theatre** | **Design Purpose** |
| --- | --- | --- | --- |
| Dunkirk | May 1940 | France | Tutorial: evacuation, defensive logistics |
| Compass | Dec 1940 | Western Desert | Desert warfare, long-range supply |
| Greece/Crete | Apr-May 1941 | Balkans | Multi-front, airborne defense |
| Tobruk | Apr-Dec 1941 | North Africa | Siege warfare, static defense |
| Crusader | Nov 1941 | North Africa | Mobile ops, supply vs manoeuvre |
| Dieppe | Aug 1942 | France | Combined-arms raid, lessons learned |
| El-Alamein | Oct 1942 | Egypt | Large-scale set-piece offensive |
| Torch | Nov 1942 | Morocco/Algeria | Amphibious landings, logistics buildup |
| Tunisia | Apr 1943 | North Africa | Transition to divisional command |
| Sicily | Jul 1943 | Italy | Multi-landing operations |
| Salerno | Sep 1943 | Italy | Beachhead defense under fire |
| Anzio | Jan 1944 | Italy | Operational stagnation, endurance |
| Monte Cassino | Jan-May 1944 | Italy | Urban warfare, morale attrition |
| Normandy | Jun 1944 | France | Large-scale invasion, corps logistics |
| Dragoon | Aug 1944 | Southern France | Coordinated secondary front |
| Market Garden | Sep 1944 | Netherlands | Airborne ops, rapid reinforcement |
| Ardennes | Dec 1944 | Belgium | Winter warfare, supply recovery |
| Rhine Crossing | Mar 1945 | Germany | Final assault, max complexity |

# 10. Gameplay Systems

## Command Progression

As players advance through ranks, they unlock new HQ tiers with expanded capabilities:

### Battalion HQ (Lt-Colonel)

- Direct command of 4 companies
- Local combat control and tactical positioning
- Basic construction: tents, small stores, aid posts, light workshops

### Brigade HQ (Brigadier)

- Command of 3 battalions through deputy commanders
- Unlocks logistics infrastructure: supply dumps, medium workshops, depots
- Reserve management and rotation scheduling

### Division HQ (Major-General)

- Command of 3 brigades plus divisional assets
- Unlocks heavy assets: artillery sites, large logistics hubs, rail/bridge repair
- Air and artillery coordination
- Wider command radius

### Corps HQ (Lieutenant-General)

- Command of 2-4 divisions
- Unlocks ports, airfields, strategic supply
- Global logistics control
- Top of player command chain

## Combat

- Real-time engagements with zoom to tactical view
- Morale, suppression, weather, and terrain affect outcomes
- Persistent battle damage and cratered terrain
- Visible combat—players can observe battles without intervention

## Construction & Infrastructure

Buildings are gated by HQ tier:

- Battalion: Tents, small stores, aid posts, light workshops
- Brigade: Supply dumps, medium workshops, depots
- Division: Artillery sites, large logistics hubs, rail/bridge repair
- Corps: Ports, airfields, strategic signals

Construction consumes resources and manpower. Proximity to supply nodes reduces cost and time.

# 11. AI Command System

AI Deputies execute your operational intent. They begin at Battalion HQ level and above—you don't control individual companies directly once you reach brigade command.

## Deputy Responsibilities by Tier

- Battalion AI: Handles company rotations, fallback when morale breaks, local tactical decisions
- Brigade AI: Handles battalion positioning, reserve commitment, sector coordination
- Division AI: Coordinates artillery and air support, manages supply priority
- Corps AI: Oversees global logistics and wider operational posture

## Command Interface

- Draw frontlines and axes of advance
- Assign tasks to subordinate HQs
- Monitor compliance and unit status
- Receive reports on problems and opportunities

## Deputy Personality Modifiers

Each deputy commander has personality traits that affect their execution:

- Aggressive: Pushes objectives, takes risks, higher casualties
- Cautious: Conserves forces, slower progress, lower casualties
- Logistical: Excellent supply discipline, methodical advance
- Improvisational: Exploits opportunities, unpredictable, can overextend

# 12. Logistics & Supply

Supply is not a background system—it defines what you can and cannot do.

## Supply Flow

- Physical supply flows via roads, rail, and air routes
- Real-time consumption of fuel, ammunition, and rations
- Infrastructure degrades over time and combat exposure
- Supplies arrive off-map into Stores, Depots, Motor Pools, and Hospitals

## Supply Penalties

Units without adequate supply suffer escalating penalties:

- Reduced rate of fire
- Reduced movement speed
- Lower morale recovery
- Eventually: combat ineffectiveness and surrender

## MVP Logistics Model

The MVP uses a simplified throughput model:

- Single integrated supply pool (no fuel/ammo split)
- Throughput simulation (capacity + distance + degradation)
- No per-truck or per-vehicle modelling
- Interdiction smoothing to avoid sudden collapses

# 13. Core Persistent Units

Four divisions serve as the backbone of the campaign, appearing across multiple operations and providing narrative continuity.

## Tier 1: Essential Core Units

### 7th Armoured Division ('Desert Rats')

**Operations:** Compass, Tobruk, Crusader, El-Alamein, Tunisia, Normandy, NW Europe

Longest continuous service of any British division. Iconic desert warfare identity, adapting to European warfare in 1944. Struggled at Villers-Bocage but recovered.

### 51st (Highland) Division

**Operations:** El-Alamein, Tunisia, Sicily, Normandy, Market Garden, Ardennes, Rhine

Redemption arc: Original division surrendered at St-Valéry in June 1940. Reconstituted, fought from El-Alamein to Berlin. Liberated St-Valéry in September 1944.

### 4th Indian Division ('Red Eagles')

**Operations:** Compass, East Africa, Syria, Crusader, El-Alamein, Tunisia, Monte Cassino

Nine campaigns across three continents. Captured over 150,000 prisoners. Captured General von Arnim personally in Tunisia.

### 50th (Northumbrian) Division

**Operations:** Dunkirk, El-Alamein, Tunisia, Sicily, Normandy (Gold Beach)

Your starting division. Evacuated from Dunkirk, fought across North Africa, landed on Gold Beach on D-Day. Full circle from defeat to victory.

## Tier 2: Significant Recurring Units

- 78th Division ('Battleaxe'): Tunisia, Sicily, Salerno, Monte Cassino, Gothic Line
- Guards Armoured Division: Normandy, Market Garden (XXX Corps spearhead), NW Europe
- 1st Airborne Division: Tunisia (infantry), Sicily, Arnhem (destroyed)
- 6th Airborne Division: Normandy (D-Day), Rhine Crossing (Varsity)
- 2nd New Zealand Division: Greece, Crete, Crusader, El-Alamein, Tunisia, Cassino

# 14. Historical NPC Commanders

These commanders appear as NPCs throughout the campaign—your superiors, peers, and eventually subordinates.

| **Commander** | **Key Commands** | **Player Relationship** |
| --- | --- | --- |
| Bernard Montgomery | 8th Army, 21st Army Group | Superior (El-Alamein onwards) |
| Harold Alexander | Middle East C-in-C, 15th Army Group | Theatre Commander (Med) |
| Brian Horrocks | XIII Corps, XXX Corps | Peer/Rival (Corps level) |
| Alan Brooke | II Corps, CIGS | Superior (Dunkirk, then CIGS) |
| Richard O'Connor | Western Desert Force, VIII Corps | Mentor (Compass), then Peer |
| Bernard Freyberg | 2nd NZ Division, Creforce | Allied Peer (NZ forces) |
| Oliver Leese | XXX Corps, 8th Army | Superior (Italy) |
| Percy Hobart | 79th Armoured Division | Specialist Support |
| Miles Dempsey | XIII Corps, Second Army | Superior (NW Europe) |

## Your Chain of Command at Dunkirk

Lord Gort (General) — C-in-C BEF

└── Alan Brooke (Lt-General) — II Corps

└── Giffard Martel (Maj-General) — 50th Division

└── Brigadier Churchill — 151st Brigade

└── YOU (Lt-Colonel) — DLI Battalion

# 15. World & Environment

## Terrain Types

- Desert: Open terrain, long sight lines, supply challenges
- Urban: Close combat, rubble, building-to-building fighting
- Mountain: Limited mobility, defensive advantage, supply difficulties
- Forest: Concealment, restricted vehicles, close engagements
- Coastal: Beach landings, cliffs, port facilities
- Bocage: Normandy hedgerows, restricted movement, ambush terrain

## Dynamic Weather

- Rain: Reduces visibility, slows movement, affects morale
- Snow: Extreme cold effects, supply consumption increases
- Dust storms: Desert operations, visibility reduction
- Fog: Concealment, navigation difficulties

## Time of Day

Day/night cycle affects visibility, morale, and movement. Night operations possible but challenging.

## Persistent Damage

- Craters remain until filled
- Destroyed bridges require repair
- Buildings show progressive damage states
- Trenches and fortifications persist

# 16. Technical Architecture (UE5)

## Core Systems

- UE5 + Mass Entity Framework for scalable agent simulation
- Three-layer simulation: Active (full detail), Operational (simplified), Abstract (statistics)
- World Partition streaming for large maps
- Deterministic deputy behaviour for reproducibility
- Efficient save system for campaign persistence

## Performance Targets

- 30-60 FPS on mid-tier hardware
- 3-4k active Mass agents at peak engagement
- Cell streaming < 2 seconds
- Save/load ≤ 10 seconds

## Implementation Details

| **System** | **Implementation** |
| --- | --- |
| Entity Framework | Mass Entity for scalable unit representation |
| Entity Grouping | Company → Battalion → Brigade → Division hierarchy for performance |
| Simulation | World Partition streaming + hierarchical simulation layers |
| AI Behavior | Mass AI fragments and State Trees for multi-tier command logic |
| Environment | Nanite terrain, Lumen lighting, Chaos destruction |
| Performance | Distance-based fidelity, Instance Static Mesh, vertex animation textures |
| Persistence | Data layers saving infrastructure and terrain state per cell |

# 17. Art Style Guide

## Visual Language: WWII Stylized Realism

Everything must be historically grounded but optimized for gameplay clarity. Think 'stylized hand-painted diorama' not 'war film screenshot.'

## Color Palette

### Faction Colors

- British: Warm khaki (RGB: 140/130/105)
- German: Cool feldgrau (RGB: 95/95/85)
- Italian: Sandy brown with distinct markings

### Terrain Colors

- Grass: Clean green (RGB: 95/120/75)
- Dirt/mud: Warm brown (RGB: 100/80/60)
- Water: Readable blue (RGB: 80/100/120)

## Combat Effects

- Fire: Bright orange-yellow, stylized flames with glow
- Smoke: Clean black-gray gradient, volumetric but stylized
- Muzzle flash: Bright white-yellow star/bloom
- Tracers: Vivid colors (British red, German green)

## What to Avoid

- Photorealistic textures (no fabric weave, skin pores)
- Excessive weathering/dirt (keeps units readable)
- Dramatic cinematic lighting (gameplay readability first)
- Complex particle effects that obscure units

## Reference Hierarchy

Primary: Company of Heroes 3 (unit detail), Steel Division 2 (operational clarity), WWII diorama photography

Secondary: Company of Heroes 2 (winter), Battlefield V (equipment accuracy only)

NOT references: Men of War (too realistic), Hell Let Loose (photorealistic), Post Scriptum (too gritty)

# 18. MVP Scope

## Goal

Deliver a playable, technically validated vertical slice demonstrating operational-scale command, deputy AI, supply throughput, and Mass-based simulation.

## Scope

**Operation:** Dunkirk (May 26 – June 4, 1940)

**Map Size:** 50 × 50 km

**Player Command:** Battalion (Lt-Colonel)

**Unit:** Durham Light Infantry, 151st Brigade, 50th Northumbrian Division

## Must-Have Features

### Command & Control

- Battalion and Brigade HQs (Division abstracted as orders source)
- Command zones defining frontage and supply linkage
- Player-defined defensive lines, fallback lines, objectives
- Simple command hierarchy: Player → Deputy → Mass units

### Units & Combat

- Infantry companies as Mass-driven agents
- Support weapons (MG, mortar, AT teams)
- Line-of-sight, weapon ranges, suppression, morale
- Entrenchment and cover modifiers

### Logistics (Throughput Model)

- Supply nodes, depots, road network
- Single integrated supply pool
- Basic out-of-supply penalties

### Engineering

- Foxholes, entrenchments, gun pits
- Depots, road upgrades, bridge demolition
- Persistent terrain damage

### Performance

- 3-4k Mass agents at 30-60 FPS
- Cell streaming < 2 seconds
- Save/load < 10 seconds

## Tutorial Integration

Dunkirk serves as both tutorial and first operation:

- Phase 1 (May 26-28): Tutorial - HQ placement, defensive lines, supply basics
- Phase 2 (May 28-Jun 4): Full operation - evacuation under pressure

## Victory Conditions

- Primary: Evacuate your battalion (minimum threshold)
- Secondary: Evacuate additional brigade elements
- Bonus: Preserve heavy equipment, save more units

# 19. Development Roadmap

| **Version** | **Milestone** | **Key Features** |
| --- | --- | --- |
| v0.1 | MVP | Dunkirk operation, core systems, tutorial |
| v0.2 | MVP+ | Brigade-level command, expanded AI |
| v0.3 | MVP++ | Operation Compass, desert terrain |
| v0.4 | Pre-Alpha | Crossroads chapter complete |
| v0.5 | Alpha | Division command, Turning Point chapter |
| v0.6 | Alpha+ | Liberation chapter, Italy operations |
| v0.7 | Beta / EA | Corps command, Normandy, Market Garden |
| v0.8 | Beta+ | Ardennes, Rhine, campaign polish |
| v0.9 | Beta++ | Full campaign playthrough, balancing |
| v1.0 | Release | Complete V for Victory campaign |

## Planned Expansions

- East Africa & Burma: Commonwealth/Indian campaigns, jungle logistics
- Commando!: British special operations, small-unit raids
- The Big Red One: U.S. Army campaign (Tunisia → Germany)
- Airborne!: 101st & 82nd Divisions, airborne operations
- Blitzkrieg: German campaigns 1939-1941
- The Pacific: U.S. Marine operations
- The Great Patriotic War: Soviet campaigns

*— End of Document —*