/**
 * https://leetcode.cn/problems/merge-sorted-array/?envType=study-plan-v2&envId=top-interview-150
 * @param {*} nums1
 * @param {*} m
 * @param {*} nums2
 * @param {*} n
 */

var merge = function (nums1, m, nums2, n) {
  for (let i = 0; i < n; i++) {
    nums1[m + i] = nums2[i];
  }
  let left = 0,
    right = m;
  console.log(nums1);

  while (right < m + n && left < right) {
    if (nums1[left] > nums1[right]) {
      let value = nums1[left];
      nums1[left] = nums1[right];
      nums1[right] = value;
      console.log(nums1);
    } else {
      left++;
    }

    if (left === right) {
      l;
      right++;
    }
  }
  console.log("end", nums1);
};
merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3);
merge([1], 1, [], 0);
merge([0], 0, [1], 1);
