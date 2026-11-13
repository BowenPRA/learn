// content/games/G02_jeopardy/images.js
// Every picture a clue can show, imported so Vite hashes it and respects the
// /classroom/ base. boards.js refers to these by key (`aImage: { src: IMAGES.cow }`),
// so a missing photo is one obvious hole here rather than a broken path buried
// in a thousand lines of clue data.
//
// Licences: images/CREDITS.json — all Wikimedia Commons, CC0 / PD / CC BY /
// CC BY-SA. Every CC BY(-SA) file needs its attribution kept, and the teacher
// plan lists the names alongside the music credits for the same reason.
//
// TWO KINDS OF PICTURE LIVE HERE, and they are sized differently on purpose.
//
//   · The Year 7 reveals (blue whale, falcon, giraffe, octopus, tardigrade,
//     leaf) are 1280px photographs. They were sourced for this board.
//   · Everything from `chopsticks` down is a Kindergarten/Year 1 picture, and
//     most are BYTE-IDENTICAL COPIES of a Word Wall tile at 500px. That is not
//     an oversight. The clue image renders about 470 CSS px wide even on a
//     fullscreen 1920 projector, so 500px is already 1:1 there — and because
//     the bytes match G01's file exactly, Vite emits one asset for both games
//     and the copy costs nothing in the bundle. Re-fetching them larger would
//     add roughly a megabyte and change nothing the class can see.
//
// The copies are copies rather than cross-folder imports so each game keeps its
// own images/ folder and its own CREDITS.json, which is the rule everywhere
// else in this repo.
//
// A clue earns a picture when seeing the thing is part of the answer. On the
// Year 7 boards that is six clues out of 120. On the Kindergarten board it is
// 29 out of 30, because a five-year-old who has just said "chopsticks" out loud
// has not finished the clue until they have seen a pair. On the Year 1 board it
// is all 25, and there the pictures ARE the question.
//
// The Year 1 section adds photographs from Commons at 800px where the Word Wall
// has nothing (the dishes, the hippo, the Earth), five flags at 480px, and two
// pictures that are not from Commons at all: the staff portraits of Mr Bowen
// and Mr Seth. Those are not openly licensed — see CREDITS.json before copying
// them anywhere else.
import blueWhale from './images/blue-whale.jpg'
import peregrineFalcon from './images/peregrine-falcon.jpg'
import giraffe from './images/giraffe.jpg'
import octopus from './images/octopus.jpg'
import tardigrade from './images/tardigrade.jpg'
import leafCrossSection from './images/leaf-cross-section.jpg'

// ── Kindergarten / Year 1 ───────────────────────────────────────────────────
// Copied from the Word Wall, so the picture on the board is the same picture
// the class sorted earlier in the week.
import chopsticks from './images/chopsticks.jpg'
import pan from './images/pan.jpg'
import pot from './images/pot.jpg'
import fridge from './images/fridge.jpg'
import toaster from './images/toaster.jpg'
import rice from './images/rice.jpg'
import bread from './images/bread.jpg'
import cake from './images/cake.jpg'
import springroll from './images/springroll.jpg'
import friedegg from './images/friedegg.jpg'
import banana from './images/banana.jpg'
import cow from './images/cow.jpg'
import hen from './images/hen.jpg'
import milk from './images/milk.jpg'
import bee from './images/bee.jpg'
import dog from './images/dog.jpg'
import spoon from './images/spoon.jpg'
import tree from './images/tree.jpg'
import carrot from './images/carrot.jpg'

// Sourced for the Kindergarten board — nothing in the Word Wall covers them.
import riceField from './images/rice-field.jpg'
import eye from './images/eye.jpg'
import ears from './images/ears.jpg'
import lemon from './images/lemon.jpg'
import ice from './images/ice.jpg'
import meltingIcecream from './images/melting-icecream.jpg'
import boilingPot from './images/boiling-pot.jpg'
import seedling from './images/seedling.jpg'

// ── Year 1 · picture questions ───────────────────────────────────────────────
// Word Wall copies again, so no new bytes in the bundle.
import kettle from './images/kettle.jpg'
import microwave from './images/microwave.jpg'
import oven from './images/oven.jpg'
import bed from './images/bed.jpg'
import sock from './images/sock.jpg'
import hat from './images/hat.jpg'
import broccoli from './images/broccoli.jpg'
import potato from './images/potato.jpg'
import doughnut from './images/doughnut.jpg'
import onion from './images/onion.jpg'
import icecream from './images/icecream.jpg'
import orange from './images/orange.jpg'
import ginger from './images/ginger.jpg'
import chips from './images/chips.jpg'
import noodles from './images/noodles.jpg'
import cheese from './images/cheese.jpg'
import egg from './images/egg.jpg'
import yoghurt from './images/yoghurt.jpg'
import pizza from './images/pizza.jpg'
import tiger from './images/tiger.jpg'
import elephant from './images/elephant.jpg'
import penguin from './images/penguin.jpg'
import duck from './images/duck.jpg'
import turtle from './images/turtle.jpg'
import ant from './images/ant.jpg'
import bus from './images/bus.jpg'
import whale from './images/whale.jpg'
import sun from './images/sun.jpg'
import moon from './images/moon.jpg'

// Sourced for the Year 1 board.
import riceCooker from './images/rice-cooker.jpg'
import ovenGlove from './images/oven-glove.jpg'
import banhMi from './images/banh-mi.jpg'
import sushi from './images/sushi.jpg'
import kimchi from './images/kimchi.jpg'
import croissant from './images/croissant.jpg'
import flagVietnam from './images/flag-vietnam.png'
import flagItaly from './images/flag-italy.png'
import flagJapan from './images/flag-japan.png'
import flagKorea from './images/flag-korea.png'
import flagFrance from './images/flag-france.png'
import hippo from './images/hippo.jpg'
import fire from './images/fire.jpg'
import snail from './images/snail.jpg'
import earth from './images/earth.jpg'

// Supplied by Mr Bowen. Staff portraits, not openly licensed.
import mrBowen from './images/mr-bowen.jpg'
import mrSeth from './images/mr-seth.jpg'

// ── Year 7 · Science Unit 2 ───────────────────────────────────────────────────
// Photographs copied byte-for-byte from the Science 2.1–2.7 decks, so the class
// sees the same picture it saw in the lesson and Vite emits one shared asset.
// The .svg files (particles, symbols, formulae, the heating curve, the air pie)
// were drawn for this board; they are pictures, not diagrams.js blocks, so
// audit:svg does not see them — their text is big and was checked by eye.
import mercury from './images/sci2-mercury.jpg'
import hourglass from './images/sci2-hourglass.jpg'
import balloon from './images/sci2-balloon.jpg'
import sponge from './images/sci2-sponge.jpg'
import diffusion from './images/sci2-diffusion.jpg'
import boilingKettle from './images/sci2-boil.jpg'
import coldGlass from './images/sci2-condensation.jpg'
import carbon from './images/sci2-carbon.jpg'
import periodicTable from './images/sci2-ptwall.jpg'
import sodium from './images/sci2-sodium.jpg'
import glassOfWater from './images/sci2-water.jpg'
import saltShaker from './images/sci2-saltshaker.jpg'
import dryIce from './images/sci2-dryice.jpg'
import chlorine from './images/sci2-chlorine.jpg'
import saltField from './images/sci2-saltfield.jpg'
import copperSulfate from './images/sci2-coppersulfate.jpg'
import magnet from './images/sci2-magnet.jpg'
import ironSulfide from './images/sci2-ironsulfide.jpg'
import traffic from './images/sci2-traffic.jpg'
import basin from './images/sci2-basin.jpg'
import limescale from './images/sci2-kettle.jpg'
import particlesSolid from './images/sci2-particles-solid.svg'
import particlesLiquid from './images/sci2-particles-liquid.svg'
import particlesGas from './images/sci2-particles-gas.svg'
import heatingCurve from './images/sci2-heating-curve.svg'
import symbolC from './images/sci2-symbol-c.svg'
import symbolClCaps from './images/sci2-symbol-cl-caps.svg'
import symbolClLower from './images/sci2-symbol-cl-lower.svg'
import symbolCl from './images/sci2-symbol-cl.svg'
import coVsCo from './images/sci2-co-vs-co.svg'
import formulaH2o from './images/sci2-formula-h2o.svg'
import airPie from './images/sci2-air-pie.svg'

// ── Year 7 · Science 2.4 + 2.8 ────────────────────────────────────────────────
// The same rule as Unit 2: every photograph is a byte-identical copy from the
// deck that showed it (sci24- from The Water Cycle, sci28- from Acids and
// Bases). The boiling kettle is reused from the Unit 2 block above.
//
// There is no pH scale picture, on purpose. A clue picture is capped at 48%
// of the card's width, so a 1-to-14 strip drew each box about 30px wide on a
// 1920 projector. That clue is words only.
import rainfall from './images/sci24-rainfall.jpg'
import hail from './images/sci24-hail.jpg'
import clouds from './images/sci24-clouds.jpg'
import halong from './images/sci24-halong.jpg'
import paddy from './images/sci24-paddy.jpg'
import pump from './images/sci24-pump.jpg'
import lemonLime from './images/sci28-lemon.jpg'
import soap from './images/sci28-soap.jpg'
import corrosive from './images/sci28-corrosive.jpg'
import litmusAcid from './images/sci28-litmus-acid.jpg'
import litmusBase from './images/sci28-litmus-base.jpg'
import antacid from './images/sci28-antacid.jpg'

// ── Year 7 · Mathematics Unit 2 + 3.1–3.2 ─────────────────────────────────────
// One drawing: the maths is the picture everywhere else on that board. It runs
// 0 to 6, not further, for the same 48% reason: fewer ticks, bigger numbers.
import numberLine from './images/ma2-number-line.svg'

// ── Year 7 · Science 3.1 + Maths 4.1–4.2 ──────────────────────────────────────
// Two photographs copied byte for byte from the decks that showed them (the
// multi-flash ball from Science 3.1, Usain Bolt from Maths 4.1–4.4), and one
// drawing: 4.65 + 3.2 worked with the last digits lined up, not the points.
import fallingBall from './images/sci31-strobe.jpg'
import usainBolt from './images/ma4-bolt.jpg'
import columnAdd from './images/ma4-column-add.svg'

// ── Year 7 · Maths Unit 4 + Science 3.1–3.2 ───────────────────────────────────
// Four photographs, every one a byte-identical copy of the picture the class
// saw in the deck: the bathroom scales from Science 3.1, and the Orion Nebula,
// Jupiter and the young star HL Tauri from Science 3.2.
import bathroomScales from './images/sci31-scales.jpg'
import orionNebula from './images/sci32-orion.jpg'
import jupiter from './images/sci32-jupiter.jpg'
import hlTauri from './images/sci32-hltau.jpg'
// Year 7 · Science 4.1–4.3 (car, microscope and coronavirus copied from the
// decks; the hybrids and the budgies fetched from Commons for this board)
import sci41Car from './images/sci41-car.jpg'
import sci42Microscope from './images/sci42-microscope.jpg'
import sci42Covid from './images/sci42-covid.jpg'
import sci43Budgies from './images/sci43-budgies.jpg'
import sci43Liger from './images/sci43-liger.jpg'
import sci43Zonkey from './images/sci43-zonkey.jpg'
import sci43Wholphin from './images/sci43-wholphin.jpg'
import sci43Pizzly from './images/sci43-pizzly.jpg'
import sci43Mule from './images/sci43-mule.jpg'

// ── Teens ─────────────────────────────────────────────────────────────────────
// Ha Long Bay again (limestone is CaCO₃), and six drawings: nuclide notation,
// an equation to balance, a parallel circuit, two powers, a chessboard and a
// stuck view counter. The sodium, chlorine, Moon and Sun are reused from above.
import teenHalong from './images/teen-halong.jpg'
import teenNuclideNa from './images/teen-nuclide-na.svg'
import teenEquationIron from './images/teen-equation-iron.svg'
import teenCircuitParallel from './images/teen-circuit-parallel.svg'
import teenPowers from './images/teen-powers.svg'
import teenChessboard from './images/teen-chessboard.svg'
import teenCounter from './images/teen-counter.svg'
// Teens 2: one drawing. Its banana, carrot and microwave are the Word Wall photos above.
import teenDiomede from './images/teen-diomede.svg'

export const IMAGES = {
  // Year 7
  blueWhale,
  peregrineFalcon,
  giraffe,
  octopus,
  tardigrade,
  leafCrossSection,
  // Kindergarten / Year 1
  chopsticks,
  pan,
  pot,
  fridge,
  toaster,
  rice,
  bread,
  cake,
  springroll,
  friedegg,
  banana,
  cow,
  hen,
  milk,
  bee,
  dog,
  spoon,
  tree,
  carrot,
  riceField,
  eye,
  ears,
  lemon,
  ice,
  meltingIcecream,
  boilingPot,
  seedling,
  // Year 1
  kettle,
  microwave,
  oven,
  bed,
  sock,
  hat,
  broccoli,
  potato,
  doughnut,
  onion,
  icecream,
  orange,
  ginger,
  chips,
  noodles,
  cheese,
  egg,
  yoghurt,
  pizza,
  tiger,
  elephant,
  penguin,
  duck,
  turtle,
  ant,
  bus,
  whale,
  sun,
  moon,
  riceCooker,
  ovenGlove,
  banhMi,
  sushi,
  kimchi,
  croissant,
  flagVietnam,
  flagItaly,
  flagJapan,
  flagKorea,
  flagFrance,
  hippo,
  fire,
  snail,
  earth,
  mrBowen,
  mrSeth,
  // Year 7 · Science Unit 2
  mercury,
  hourglass,
  balloon,
  sponge,
  diffusion,
  boilingKettle,
  coldGlass,
  carbon,
  periodicTable,
  sodium,
  glassOfWater,
  saltShaker,
  dryIce,
  chlorine,
  saltField,
  copperSulfate,
  magnet,
  ironSulfide,
  traffic,
  basin,
  limescale,
  particlesSolid,
  particlesLiquid,
  particlesGas,
  heatingCurve,
  symbolC,
  symbolClCaps,
  symbolClLower,
  symbolCl,
  coVsCo,
  formulaH2o,
  airPie,
  // Year 7 · Science 2.4 + 2.8
  rainfall,
  hail,
  clouds,
  halong,
  paddy,
  pump,
  lemonLime,
  soap,
  corrosive,
  litmusAcid,
  litmusBase,
  antacid,
  // Year 7 · Mathematics Unit 2 + 3.1–3.2
  numberLine,
  // Year 7 · Science 3.1 + Maths 4.1–4.2
  fallingBall,
  usainBolt,
  columnAdd,
  // Year 7 · Maths Unit 4 + Science 3.1–3.2
  bathroomScales,
  orionNebula,
  jupiter,
  hlTauri,
  // Year 7 · Science 4.1–4.3
  sci41Car,
  sci42Microscope,
  sci42Covid,
  sci43Budgies,
  sci43Liger,
  sci43Zonkey,
  sci43Wholphin,
  sci43Pizzly,
  sci43Mule,
  // Teens
  teenHalong,
  teenNuclideNa,
  teenEquationIron,
  teenCircuitParallel,
  teenPowers,
  teenChessboard,
  teenCounter,
  teenDiomede,
}
