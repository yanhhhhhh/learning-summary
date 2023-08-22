/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}
function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  if (!l1 || !l2) return null;
  let n1: number = l1.val,
    n2 = l2.val;
  let i1 = 0,
    i2 = 0;

  let next1 = l1.next,
    next2 = l2.next;
  while ((next1 = l1.next)) {
    n1 += 10 ** ++i1 * l1.val;
  }
  while (next2) {
    n2 += 10 ** ++i1 * l1.val;
  }
  const res = String(n1 + n2);
  const head = new ListNode();
  let listNode = head;
  for (let i of res) {
    listNode.val = Number(i);
    listNode.next = new ListNode();
    listNode = listNode.next;
  }
  return head;
}
