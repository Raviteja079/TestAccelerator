// src/components/TestCardDnD/TestCardDnD.jsx
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './TestCardDnD.css'; // Optional styling

const TestCardDnD = () => {
    const [tests, setTests] = useState([
        { id: 'test-1', title: 'Login Functionality' },
        { id: 'test-2', title: 'Signup Flow' },
        { id: 'test-3', title: 'Checkout Process' },
    ]);

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(tests);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setTests(items);
    };

    return (
        <div className="test-card-dnd">
            <h2>Reorder Test Cards</h2>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="testCards" isDropDisabled={false} isCombineEnabled={false} ignoreContainerClipping={false}>
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="test-list"
                        >
                            {tests.map((test, index) => (
                                <Draggable key={test.id} draggableId={test.id} index={index}>
                                    {(provided) => (
                                        <div
                                            className="test-card"
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            {test.title}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default TestCardDnD;
