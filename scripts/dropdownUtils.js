const addSelectedElement = (
  elementsList,
  selectedElementsList,
  selectedElements,
  element
) => {
  let removeSelectedElementButton = undefined;

  element.childNodes.forEach((node) => {
    if (node.nodeName === "BUTTON") {
      removeSelectedElementButton = node;
    }
  });

  removeSelectedElementButton.classList.add("dropdown-menu-item-remove-button");
  removeSelectedElementButton.classList.remove(
    "dropdown-menu-item-remove-button-hidden"
  );
  element.classList.add("dropdown-menu-item-selected");
  selectedElements.push(element.textContent);
  elementsList.removeChild(element);
  selectedElementsList.appendChild(element);
  return selectedElements;
};

const removeSelectedElement = (
  elementsList,
  selectedElementsList,
  selectedElements,
  element
) => {
  let removeSelectedElementButton = undefined;

  element.childNodes.forEach((node) => {
    if (node.nodeName === "BUTTON") {
      removeSelectedElementButton = node;
    }
  });

  removeSelectedElementButton.classList.remove(
    "dropdown-menu-item-remove-button"
  );
  removeSelectedElementButton.classList.add(
    "dropdown-menu-item-remove-button-hidden"
  );
  element.classList.remove("dropdown-menu-item-selected");
  selectedElementsList.removeChild(element);
  elementsList.insertBefore(element, elementsList.firstChild);
  selectedElements = selectedElements.filter(
    (selectedElement) => selectedElement.textContent === element.textContent
  );
  return selectedElements;
};

/**
 * @description handle the selection of clicked element in a dropdown menu
 * @param {HTMLUListElement} elementsList DOM ELement reprensenting a list of elements
 * @param {HTMLUListElement} selectedElementsList  DOM ELement reprensenting a list of selected elements
 * @param {Object} selectedElements array of selected dropdown menu items
 * @param {HTMLLIElement} element DOM element clicked by the user
 * @returns {Object} updated array of selected dropdown menu items
 */
export const handleSelectedElement = (
  elementsList,
  selectedElementsList,
  selectedElements,
  element
) => {
  let removeSelectedElementButton = undefined;
  let isElementSelected = false;

  element.childNodes.forEach((node) => {
    if (node.nodeName === "BUTTON") {
      removeSelectedElementButton = node;
    }
  });

  selectedElementsList.childNodes.forEach((selectedElement) => {
    if (selectedElement.textContent === element.textContent) {
      isElementSelected = true;
    }
  });

  if (isElementSelected) {
    selectedElements = removeSelectedElement(
      elementsList,
      selectedElementsList,
      selectedElements,
      element
    );
  } else {
    selectedElements = addSelectedElement(
      elementsList,
      selectedElementsList,
      selectedElements,
      element
    );
  }
  return selectedElements;
};
