"use client"

import Modal from "@/app/components/Modal"
import { useParams } from "next/navigation"
import { Button } from "@/app/components/ui/button"
import { Textarea } from "@/app/components/ui/textarea"
import { Label } from "@/app/components/ui/label"

export default function Issue() {
  const params = useParams()
  return (
    <Modal>
      <div className='flex gap-4'>
        <div className='flex flex-col w-3/5 md:w-1/2 max-h-80 overflow-y-auto pr-2'>
          {/* <h2 className='text-lg font-semibold leading-none'>Modal</h2> */}
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
            similique veritatis sint quo adipisci voluptatem, esse unde id
            repellendus earum! Fugiat similique dolorem perspiciatis
            perferendis! Ab nemo saepe nihil quis?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
            similique veritatis sint quo adipisci voluptatem, esse unde id
            repellendus earum! Fugiat similique dolorem perspiciatis
            perferendis! Ab nemo saepe nihil quis?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
            similique veritatis sint quo adipisci voluptatem, esse unde id
            repellendus earum! Fugiat similique dolorem perspiciatis
            perferendis! Ab nemo saepe nihil quis?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
            similique veritatis sint quo adipisci voluptatem, esse unde id
            repellendus earum! Fugiat similique dolorem perspiciatis
            perferendis! Ab nemo saepe nihil quis?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
            similique veritatis sint quo adipisci voluptatem, esse unde id
            repellendus earum! Fugiat similique dolorem perspiciatis
            perferendis! Ab nemo saepe nihil quis?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
            similique veritatis sint quo adipisci voluptatem, esse unde id
            repellendus earum! Fugiat similique dolorem perspiciatis
            perferendis! Ab nemo saepe nihil quis?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
            similique veritatis sint quo adipisci voluptatem, esse unde id
            repellendus earum! Fugiat similique dolorem perspiciatis
            perferendis! Ab nemo saepe nihil quis?
          </p>
        </div>
        <div className='flex flex-col gap-2 max-h-80 overflow-y-auto w-1/2'>
          <Label htmlFor='text'>Your Answer</Label>
          <Textarea
            placeholder='Write your answer here...'
            id='text'
            className='resize-none h-80'
          />
          <Button>Send Answer</Button>
        </div>
      </div>
    </Modal>
  )
}
