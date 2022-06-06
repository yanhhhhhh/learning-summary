/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
 var findMedianSortedArrays = function(nums1, nums2) {
  var nums = [...nums1,...nums2].sort((a,b)=>a-b)
  console.log(nums);
  let length = nums.length
  if(length%2==0)return (nums[length/2-1]+nums[length/2])/2
  else return nums[Math.floor(length/2)]
  };
// console.log(findMedianSortedArrays([1,3],[2]))
console.log(findMedianSortedArrays([3],[-2,-1]))