import {jStat} from 'jStat';

export function meanCI(array, confidence, variance) {
  const s_mean = jStat.mean(array);
  const n = array.length;
  if (variance > 0) {
    const z = jStat.normal.inv((1-confidence)/2, 0, 1);
    const c = Math.abs(z * Math.sqrt(variance / n));
    return [s_mean - c, s_mean + c];
  } else {
    const t = jStat.studentt.inv((1-confidence)/2, n - 1);
    const c = Math.abs(t * Math.sqrt(jStat.variance(array) / array.length));
    return [s_mean - c, s_mean + c];
  }
};

export function ttest(s_mean, s_variance, dof) {
  const t_score = -Math.abs(Math.sqrt((dof+1)/s_variance) * s_mean);
  return 2 * jStat.studentt.cdf(t_score, dof);
};

export function fromPriceToReturns(prices) {
  const initial = (prices.length == 0)? 0 : prices[0].adjusted;
  return prices.map((price) => ((price.close - initial)*100/initial));
};

export function diffOfMean(r1, r2, v1, v2) {
  const m1 = jStat.mean(r1), m2 = jStat.mean(r2), m = r1.length, n = r2.length;
  let z = 0;
  if (v1 > 0 && v2 > 0) {
    // if variance is known
    z = (m1 - m2)/Math.sqrt(v1/m + v2/n);
  } else if (m > 30 && n > 30) {
    // if variance is known
    z = (m1 - m2)/Math.sqrt(jStat.variance(r1)/m + jStat.variance(r2)/n);
  } else {
    return "Too complicated to Test";
  }
  return jStat.ztest(z, 2);
};
