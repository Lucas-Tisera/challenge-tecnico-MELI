const fetch = require('node-fetch');
const { default: useFetchItems } = require('./hooks/useFetch');

// Test case for successful response with items
async function testFetchItemsWithItems() {
    // Arrange
    const query = 'apple';
    const expectedResponse = {
        error: false,
        items: [
            { id: 1, name: 'Apple', price: 1.99 },
            { id: 2, name: 'Green Apple', price: 2.49 }
        ]
    };

    // Act
    const response = await useFetchItems(query);

    // Assert
    expect(response).toEqual(expectedResponse);
}

// Test case for successful response with no items
async function testFetchItemsWithNoItems() {
    // Arrange
    const query = 'banana';
    const expectedResponse = {
        error: true,
        message: 'No se encontraron resultados'
    };

    // Act
    const response = await useFetchItems(query);

    // Assert
    expect(response).toEqual(expectedResponse);
}

// Test case for error response
async function testFetchItemsWithError() {
    // Arrange
    const query = 'error';
    const expectedResponse = {
        error: true,
        message: 'No se encontraron resultados'
    };

    // Act
    const response = await useFetchItems(query);

    // Assert
    expect(response).toEqual(expectedResponse);
}

// Run the test cases
testFetchItemsWithItems();
testFetchItemsWithNoItems();
testFetchItemsWithError();