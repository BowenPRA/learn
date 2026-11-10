// A lesson module: default-exports { meta, slides, plan }. The registry
// auto-discovers this file (content/<course>/<unit>/index.js).
//
// 6.2 Taking a sample: the second and last section of Unit 6 Collecting data.
// Population, sample and sample size; a fair (representative) sample chosen at
// random; why a large sample is better than a small one (random samples of 5
// and 50 from Mr Bowen's school); and the Workbook's question "Is this a good
// way to choose a sample?". One period after 6.1, on the same shape. English
// and French.
import { slides } from './slides.js'
import { plan } from './plan.js'

export default {
  meta: {
    course: 'y7-math',
    unit: '6.2',
    id: 'U06_2',
    title: 'Taking a Sample',
    subtitle: 'Ask some, learn about everyone: a fair sample, chosen at random, and big enough to trust',
    objective:
      'Name the population, the sample and the sample size; explain why we take a sample; choose a fair (representative) sample at random, ' +
      'from every group; explain why a large sample is better than a small one (its answer jumps about less) but need not be everyone; ' +
      'and answer “Is this a good way to choose a sample?” with reasons.',
    order: 21,
    french: true,
    vietnamese: false,
  },
  slides,
  plan,
}
