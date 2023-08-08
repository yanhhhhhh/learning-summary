function minWindow(s, t) {
  const need = new Map();
  const window = new Map();
  let left = 0,
    right = 0;
  let valid = 0,
    min = s.length,
    start = 0;
  for (let i of t) {

    need.has(i) ? need.set(i,need.get(i)+1) : (need.set(i,1));
  }

  console.log(need,s.length);
  while (right < s.length) {
    let c = s[right];
    right++;
   
    if (need.has(c)) {

      window.has(c) ? window.set(c,window.get(c)+1) : (window.set(c,1));
      if (window.get(c) === need.get(c)) {

        valid++;
      }
    }
   
    
    while (valid === need.size) {
      if (right - left < min) {
        start = left;
        min = right - left;
      }
     
      let l = s[left];
      left++;
      if(need.has(l)){
        if (window.get(l) === need.get(l)) {
            valid--;
          }
          window.set(l,window.get(l)-1)
      }
     
    }
  }
  return min == s.length ? "" : s.slice(start, start + min);
}

const sub = minWindow("ADOBECODEBANC", "ABC");
console.log(sub);

