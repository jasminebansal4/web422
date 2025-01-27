#  Lab 2 - Full Implementation

# PART A: Analysis Functions

def function1(number):
    total = 0
    for i in range(number):
        x = i + 1
        total += x * x
    return total

# Time Complexity: O(n), where n = number
# Space Complexity: O(1)

def function2(number):
    return (number * (number + 1) * (2 * number + 1)) // 6

# Time Complexity: O(1)
# Space Complexity: O(1)

def function3(lst):
    for i in range(len(lst) - 1):
        for j in range(len(lst) - 1 - i):
            if lst[j] > lst[j + 1]:
                tmp = lst[j]
                lst[j] = lst[j + 1]
                lst[j + 1] = tmp

# Time Complexity: O(n^2), where n = len(lst)
# Space Complexity: O(1)

def function4(number):
    total = 1
    for i in range(1, number):
        total *= i + 1
    return total

# Time Complexity: O(n), where n = number
# Space Complexity: O(1)

# PART B: Recursive Implementations

# Recursive Factorial Function
def factorial(number):
    if number <= 1:
        return 1
    return number * factorial(number - 1)

# Recursive Linear Search
def linear_search(lst, key):
    def search_helper(index):
        if index == len(lst):  # Base case: end of list
            return -1
        if lst[index] == key:  # Found the key
            return index
        return search_helper(index + 1)  # Recurse to next index

    return search_helper(0)

# Recursive Binary Search
def binary_search(lst, key):
    def search_helper(low, high):
        if low > high:  # Base case: not found
            return -1
        mid = (low + high) // 2
        if lst[mid] == key:  # Found the key
            return mid
        elif lst[mid] < key:  # Search in the right half
            return search_helper(mid + 1, high)
        else:  # Search in the left half
            return search_helper(low, mid - 1)

    return search_helper(0, len(lst) - 1)

# PART C: Functions for Discussion

def one(mylist, key):
    total = 0
    for i in range(len(mylist)):
        for j in range(i + 1, len(mylist)):
            if i != j:
                if mylist[i] + mylist[j] == key:
                    total += 1
    return total

# Time Complexity: O(n^2), where n = len(mylist)
# Space Complexity: O(1)

def two(mylist, key):
    total = 0
    mylist.sort()  # Sorting takes O(n log n)
    i = 0
    j = len(mylist) - 1
    while i < j:
        if mylist[i] + mylist[j] < key:
            i += 1
        elif mylist[i] + mylist[j] > key:
            j -= 1
        else:
            total += 1
            i += 1
            j -= 1
    return total

# Time Complexity: O(n log n) (due to sorting)
# Space Complexity: O(1)

def three(mylist, key):
    items = {}
    total = 0
    for number in mylist:
        items[number] = 1
    for number in mylist:
        other = key - number
        if other in items:
            total += 1
    return total // 2

# Time Complexity: O(n), where n = len(mylist)
# Space Complexity: O(n)

# Timing Utility (Part of Part C Discussion)
# if __name__ == "__main__":
#     import time

#     # Sample data for testing
#     sample_list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
#     sample_key = 10

#     # Test and time function one
#     start = time.time()
#     result_one = one(sample_list, sample_key)
#     end = time.time()
#     print(f"Result from 'one': {result_one}, Time taken: {end - start} seconds")

#     # Test and time function two
#     start = time.time()
#     result_two = two(sample_list, sample_key)
#     end = time.time()
#     print(f"Result from 'two': {result_two}, Time taken: {end - start} seconds")

#     # Test and time function three
#     start = time.time()
#     result_three = three(sample_list, sample_key)
#     end = time.time()
#     print(f"Result from 'three': {result_three}, Time taken: {end - start} seconds")
