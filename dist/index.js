const list = ListFactory(1);
console.log(list.append(5));

function ListFactory(value)
{
  if (value == null)
  {
    throw new Error("Value not passed to factory.");
  }

  let head = Node(value);
  let tail = head;
  let length = 1;

  function append(value)
  {
    if (value == null)
    {
      throw new Error("Value not passed to function.");
    }

    const newNode = Node(value);

    tail.next = newNode;
    tail = newNode;
    length++;

    return newNode;
  }

  function prepend(value)
  {
    if (value == null)
    {
      throw new Error("Value not passed to function.");
    }

    const newNode = Node(value);

    newNode.next = head;
    head = newNode;
    length++;

    return newNode;
  }

  function at(index)
  {
    if (typeof index != 'number' || index % 1 != 0)
    {
      throw new Error('Integer must be passed.');
    }
    else if (index > length)
    {
      throw new Error('Out of bound index, list size: ' + length);
    }

    let currentNode = head;

    for (let i = 0; i < index; i++)
    {
      currentNode = currentNode.next;
    }

    return currentNode;
  }

  function pop()
  {
    const newTail = at(length - 2);
    const oldTail = tail;

    newTail.next = null;
    tail = newTail;
    length--;

    return oldTail;
  }

  function find(value)
  {
    if (value == null)
    {
      throw new Error("Value not passed to function.");
    }

    let currentNode = head;

    for (let i = 0; i < length; i++)
    {
      if (currentNode.value == value)
      {
        return i;
      }

      currentNode = currentNode.next;
    }
  }

  function contains(value)
  {
    if (find(value) != null)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  function toString()
  {
    let returnStr = '';
    let currentNode = head;

    for (let i = 0; i < length; i++)
    {
      returnStr += `( ${currentNode.value} ) -> `

      currentNode = currentNode.next;
    }

    return returnStr += 'null'
  }

  function insertAt(value, index)
  {
    if (typeof index != 'number' || index % 1 != 0)
    {
      throw new Error('Integer must be passed.');
    }
    else if (index > length)
    {
      throw new Error('Out of bound index, list size: ' + length);
    }
    else if (value == null)
    {
      throw new Error("Value not passed to function.");
    }

    const nodeBefore = at(index - 1);
    const atIndex = nodeBefore.next;

    nodeBefore.next = Node(value);
    nodeBefore.next.next = atIndex;
    length++;
  }

  function removeAt(index)
  {
    if (typeof index != 'number' || index % 1 != 0)
    {
      throw new Error('Integer must be passed.');
    }
    else if (index > length)
    {
      throw new Error('Out of bound index, list size: ' + length);
    }

    const nodeBefore = at(index - 1);
    nodeBefore.next = nodeBefore.next.next;
    length--;
  }
  
  return {
    append,
    prepend,
    at,
    pop,
    find,
    contains,
    toString,
    insertAt,
    removeAt,
    get head()
    {
      return head;
    },

    get tail()
    {
      return tail;
    },

    get size()
    {
      return length;
    }
  }
}

function Node(value)
{
  return { value, next: null};
}