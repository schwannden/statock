const {mean, normal, studentt, variance, ztest, sum,} = jStat;

export function innerProduct(x, y) {
  return sum(jStat([x, y]).product());
}

export function meanCI(array, confidence, variance) {
  const s_mean = mean(array);
  const n = array.length;
  if (variance > 0) {
    const z = jStat.normal.inv((1-confidence)/2, 0, 1);
    const c = Math.abs(z * Math.sqrt(jStat.variance / n));
    return [s_mean - c, s_mean + c];
  } else {
    const t = jStat.studentt.inv((1-confidence)/2, n - 1);
    const c = Math.abs(t * Math.sqrt(jStat.variance(array) / array.length));
    return [s_mean - c, s_mean + c];
  }
};

export function ttest(s_mean, s_variance, dof) {
  const t_score = -Math.abs(Math.sqrt((dof+1)/s_variance) * s_mean);
  return 2 * studentt.cdf(t_score, dof);
};

export function fromPriceToReturns(prices) {
  const initial = (prices.length == 0)? 0 : prices[0].adjusted;
  return prices.map((price) => ((price.close - initial)*100/initial));
};

export function diffOfMean(r1, r2, v1, v2) {
  const m1 = mean(r1), m2 = mean(r2), m = r1.length, n = r2.length;
  let z = 0;
  if (v1 > 0 && v2 > 0) {
    // if variance is known
    z = (m1 - m2)/Math.sqrt(v1/m + v2/n);
  } else if (m > 30 && n > 30) {
    // if variance is known
    z = (m1 - m2)/Math.sqrt(variance(r1)/m + variance(r2)/n);
  } else {
    return "Too complicated to Test";
  }
  return ztest(z, 2);
};

export function binCount(array, bins) {
  array = array.sort((x, y) => x - y);
  const n = array.length, min = array[0], max = array[n-1], delta = (max-min)/bins;
  let low = min, high = min + delta, counts = [{x: Math.round((low + high)/2*100)/100, y:0}], arr_index = 0, point = 0;
  for (let i = 0 ; i < bins ; i++) {
    while (((point=array[arr_index]), (point >= low && point < high))) {
      counts[i].y++;
      arr_index++;
    }
    low = high;
    high += delta;
    counts.push({x: Math.round((low + high)/2*100)/100, y:0})
  }
  return counts.map(count => {count.y /= n; return count;});
};

export function multiply21(x, y) {
  const dim_x1 = x.length, dim_x2 = x[0].length, dim_y = y.length;
  if (dim_x2 != dim_y)
    throw("dimension mismatch")
  let result = Array(dim_x1)
  for (let i = 0 ; i < dim_x1 ; i++) {
    result[i] = innerProduct(x[i], y);
  }
  return result;
}
