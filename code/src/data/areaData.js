import * as d3 from 'd3'

// Inspired by Lee Byron’s test data generator.
function bump(a, n) {
    const x = 1 / (0.1 + Math.random());
    const y = 2 * Math.random() - 0.5;
    const z = 10 / (0.1 + Math.random());
    for (let i = 0; i < n; ++i) {
    const w = (i / n - y) * z;
    a[i] += x * Math.exp(-w * w);
    }
}
function bumps(n, m) {
    const a = [];
    for (let i = 0; i < n; ++i) a[i] = 0;
    for (let i = 0; i < m; ++i) bump(a, n);
    return a;
};

// export const areaData = d3.transpose(Array.from({length: 3}, () => bumps(200, 10)))
export const areaData = [
    {month: new Date(2015, 0, 1), apples: 3840, bananas: 1920, cherries: 960, dates: 400},
    {month: new Date(2015, 1, 1), apples: 1600, bananas: 1440, cherries: 960, dates: 400},
    {month: new Date(2015, 2, 1), apples:  640, bananas:  960, cherries: 640, dates: 400},
    {month: new Date(2015, 3, 1), apples:  320, bananas:  480, cherries: 640, dates: 400}
];
