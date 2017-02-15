import Track from './Track';
import {parseSpanValueData} from '../dataParser';
import {arc} from 'd3-shape';
import assign from 'lodash/assign';
import {radial, values, common} from '../configs';


const defaultConf = assign({
  backgrounds: {
    value: [],
    iteratee: false,
  },
}, radial, values, common);

export default class Heatmap extends Track {
  constructor(instance, conf, data) {
    super(instance, conf, defaultConf, data, parseSpanValueData);
  }

  renderDatumContainer(instance, parentElement, name, data, conf) {
    const track = parentElement.append('g');

    return this.renderBlock(track, data, instance._layout, conf);
  }

  renderDatum(parentElement, conf, layout) {
    return parentElement.selectAll('tile')
      .data((d) => d.values)
      .enter().append('path')
      .attr('class', 'tile')
      .attr('opacity', conf.opacity)
      .attr('d', arc()
        .innerRadius(conf.innerRadius)
        .outerRadius(conf.outerRadius)
        .startAngle((d, i) => this.theta(d.start, layout.blocks[d.block_id]))
        .endAngle((d, i) => this.theta(d.end, layout.blocks[d.block_id]))
      )
      .attr('fill', conf.color);
  }
}