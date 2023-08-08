"use strict";
function minWindow(s, t) {
    let left = 0, right = 0, len = s.length + 1, start = 0, valid = 0;
    const window = {};
    const need = {};
    for (let i of t) {
        need[i] ? need[i]++ : need[i] = 1;
    }
    while (right < s.length) {
        let c = s[right];
        right++;
        if (need[c]) {
            window[c] ? window[c]++ : window[c] = 1;
            if (window[c] === need[c]) {
                valid++;
            }
        }
        while (valid === Object.keys(need).length) {
            if (right - left < len) {
                start = left;
                len = right - left;
            }
            let l = s[left];
            left++;
            if (need[l]) {
                if (need[l] === window[l]) {
                    valid--;
                }
                window[l]--;
            }
        }
    }
    console.log({ start, len });
    return len === s.length + 1 ? '' : s.slice(start, start + len);
}
console.log(minWindow("AFDCBSC", "BAC"));
console.log(minWindow("a", "aa"));
console.log(minWindow("a", "a"));
