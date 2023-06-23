import { LitElement, html, PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { cssify } from '../../utils/css';
import styles from './graph-view.scss';
import * as d3 from 'd3';

export interface ChartConfig<T, U> {
	x: (d: T) => number | Date;
	y: (d: T) => number;
	z: (d: T) => U;
	label?: (d: T) => string;
	color: (z: U) => string;
	width?: number;
	curve?: d3.CurveFactory;
	xType?: typeof d3.scaleUtc;
	xDomain?: [number | Date, number | Date];
	yType?: typeof d3.scaleLinear;
	yDomain?: [number, number];
	zDomain?: any;
}

@customElement('graph-view')
export default class GraphView<T, U> extends LitElement {
	static styles = cssify(styles);

	@property({ type: Object })
	data: T[];

	config: ChartConfig<T, U>;

	renderWidth: number;

	@query('#base')
	baseElement: HTMLElement;

	observer: ResizeObserver;

	firstUpdated(p: PropertyValues) {
		super.firstUpdated(p);

		// Create an observer for resizes
		this.observer = new ResizeObserver(() => {
			// Update size and initial value
			this.onResize();
		});

		this.observer.observe(this.baseElement);

		// Update width value for the first time
		this.updateComplete.then(async () => {
			// Waiting for this makes sure that all updates have finished
			await this.getUpdateComplete();

			// Update size and initial value
			this.onResize();
		});
	}

	onResize() {
		let old = this.renderWidth;
		let rect = this.baseElement.getBoundingClientRect();

		// Cache the metrics body width for svg
		let newWidth = rect.width;
		if (newWidth && !isNaN(newWidth)) this.renderWidth = newWidth;

		this.requestUpdate('renderWidth', old);
	}

	render() {
		this.config.width = this.renderWidth;
		let chart = LineChart<T, U>(this.data, this.config);

		return html`<div id="base">${chart}</div>`;
	}
}

// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/multi-line-chart
function LineChart<T, U>(
	data: T[],
	{
		x, // given d in data, returns the (temporal) x-value
		y, // given d in data, returns the (quantitative) y-value
		z,
		label,
		color = () => 'white',
		width = 200,
		curve = d3.curveLinear, // method of interpolation between points
		xType = d3.scaleUtc, // type of x-scale
		xDomain, // [xmin, xmax]
		yType = d3.scaleLinear, // type of y-scale
		yDomain, // [ymin, ymax]
		zDomain
	} = {} as ChartConfig<T, U>
) {
	let marginLeft = 8;
	let marginRight = 36;
	let marginTop = 7;
	let marginBottom = 15;
	let height = width * 0.4; // ratio
	let strokeLinecap = '';
	let strokeLinejoin = '';
	let strokeWidth = 2;
	let strokeOpacity = 0.7;
	let mixBlendMode = 'unset';

	// Compute values.
	let X = d3.map(data, x);
	let Y = d3.map(data, y);
	let Z = d3.map(data, z);
	let D = d3.map(data, (_, i) => !isNaN(X[i] as number) && !isNaN(Y[i]));

	// Compute default domains, and unique the z-domain.
	if (xDomain === undefined) xDomain = d3.extent(X);
	if (yDomain === undefined) yDomain = [0, 1];
	if (zDomain === undefined) zDomain = Z;
	zDomain = new d3.InternSet(zDomain);

	// Omit any data not present in the z-domain.
	let I = d3.range(X.length).filter(i => zDomain.has(Z[i]));

	// Construct scales and axes.
	let xScale = xType(xDomain, [marginLeft, width - marginRight]);
	let yScale = yType(yDomain, [height - marginBottom, marginTop]);
	let xAxis = d3.axisBottom(xScale).ticks(6, d3.timeFormat('%H:%M UTC'));
	let yAxis = d3.axisRight(yScale).ticks(3, d3.format('.0%'));

	// Compute labels.
	let T = label === undefined ? Z : label === null ? null : d3.map(data, label);

	// Construct a line generator.
	let line = d3
		.line<number>()
		.defined((_, i) => D[i])
		.curve(curve)
		.x(i => xScale(X[i]))
		.y(i => yScale(Y[i]));

	let svg = d3
		.create('svg')
		.attr('width', Math.floor(width))
		.attr('height', Math.floor(height))
		.attr('viewBox', [0, 0, Math.floor(width), Math.floor(height)])
		.attr('style', 'max-width: 100%; height: auto; height: intrinsic; overflow: visible;')
		.style('-webkit-tap-highlight-color', 'transparent')
		.on('pointerenter', () => {
			path.style('stroke-opacity', 0.2);
			dot.attr('display', null);
		})
		.on('pointermove', (event: Event) => {
			let [xm, ym] = d3.pointer(event);
			let i = d3.least(I, i => Math.hypot(xScale(X[i]) - xm, yScale(Y[i]) - ym)); // closest point

			path.style('stroke-opacity', ([z]) => (Z[i] === z ? null : 0.2))
				.filter(([z]) => Z[i] === z)
				.raise();
			dot.attr('transform', `translate(${xScale(X[i])},${yScale(Y[i])})`);

			if (T) dot.select('text').text(T[i].toString());
		})
		.on('pointerleave', () => {
			path.style('mix-blend-mode', mixBlendMode).style('stroke-opacity', null);
			dot.attr('display', 'none');
			(svg.node() as any).value = null;
		})
		.on('touchstart', event => event.preventDefault());

	svg.append('g')
		.attr('transform', `translate(0,${height - marginBottom - 1})`)
		.call(xAxis)
		.call(g => g.select('.domain').attr('transform', `translate(0,1)`).style('stroke-opacity', 0.15))
		.call(g => g.selectAll('text').attr('fill', '#ececece0'))
		.call(g => g.selectAll('.tick line').attr('stroke-opacity', 0.1));

	svg.append('g')
		.attr('transform', `translate(${width - marginRight},0)`)
		.call(yAxis)
		.call(g => g.select('.domain').style('stroke-opacity', 0.15))
		.call(g => g.selectAll('text').attr('fill', '#ececece0'))
		.call(g => {
			g.selectAll('.tick line')
				.attr('x2', marginLeft - width + marginRight)
				.attr('stroke-dasharray', '8 5')
				.attr('stroke-opacity', 0.1);
			g.selectAll('.tick line')
				.filter((_, i) => i == 0)
				.remove();
		});

	let path = svg
		.append('g')
		.attr('fill', 'none')
		.attr('stroke-linecap', strokeLinecap)
		.attr('stroke-linejoin', strokeLinejoin)
		.attr('stroke-width', strokeWidth)
		.attr('stroke-opacity', strokeOpacity)
		.selectAll('path')
		.data(d3.group(I, i => Z[i]))
		.join('path')
		.style('mix-blend-mode', mixBlendMode)
		.attr('stroke', ([t, _]) => color(t))
		.attr('d', ([_, I]) => line(I));

	let dot = svg.append('g').attr('display', 'none');

	dot.append('circle').attr('fill', '#ececec').attr('r', 2.5);
	dot.append('text')
		.attr('font-family', '"Open Sans", sans-serif')
		.attr('font-weight', 600)
		.attr('font-size', 14)
		.attr('text-anchor', 'middle')
		.attr('fill', '#ececec')
		.attr('y', -8);

	return Object.assign(svg.node(), { value: null });
}
