// content/y7-science/U02_model_states/slides.js
// One slide: the `game` layout hands the whole slide to the model, because a
// header strip would eat the height the simulation needs and it carries its own
// title, controls and read-outs.
import { StateModel } from './widgets.jsx'

export const slides = [
  {
    layout: 'game',
    title: 'Heating & Cooling: A Particle Model',
    titleVn: 'Đun nóng & Làm lạnh: Mô hình hạt',
    widget: StateModel,
  },
]
