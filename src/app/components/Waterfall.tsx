import React, { useState, useEffect } from 'react'
import Image from 'next/image'

interface Item {
  name: string
  path: string
  type: string
}

interface WaterfallProps {
  items: Item[]
}

const Waterfall: React.FC<WaterfallProps> = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)

  const handlePreview = (item: Item) => {
    setSelectedItem(item)
  }

  const closePreview = () => {
    setSelectedItem(null)
  }

  return (
    <div className="waterfall-container">
      <div className="grid">
        {items.map((item, index) => (
          <div key={index} className="item">
            <div className="item-inner">
              <Image
                src={item.path}
                alt={item.name}
                width={100}
                height={100}
                layout="responsive"
                objectFit="cover"
              />
              <div className="item-overlay">
                <h3>{item.name}</h3>
                <button onClick={() => handlePreview(item)}>Preview</button>
                <a href={item.path} download={item.name}>
                  Download
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div className="preview-modal" onClick={closePreview}>
          <div className="preview-content" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedItem.path}
              alt={selectedItem.name}
              width={800}
              height={800}
              layout="responsive"
              objectFit="contain"
            />
            <div className="preview-info">
              <h2>{selectedItem.name}</h2>
              <p>Type: {selectedItem.type}</p>
            </div>
            <button className="close-button" onClick={closePreview}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Waterfall
