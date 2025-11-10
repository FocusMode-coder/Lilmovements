import ClassCard from './ClassCard'
import { PRIMARY_INSTRUCTOR } from '../../lib/constants'

interface ClassGridProps {
  activeTag: string
  limit?: number
}

// Demo dataset with 10 classes - all taught by Lillian Hahn Shining
const demoClasses = [
  {
    title: "Core Power",
    coach: PRIMARY_INSTRUCTOR,
    duration: "30 min",
    tag: "strength", 
    thumbnailSrc: "/placeholders/thumb-2.jpg"
  },
  {
    title: "Mindful Breath",
    coach: PRIMARY_INSTRUCTOR, 
    duration: "20 min",
    tag: "meditation",
    thumbnailSrc: "/placeholders/thumb-1.jpg"
  },
  {
    title: "HIIT Blast",
    coach: PRIMARY_INSTRUCTOR,
    duration: "15 min",
    tag: "quick",
    thumbnailSrc: "/placeholders/thumb-2.jpg"
  },
  {
    title: "Beginner Flow",
    coach: PRIMARY_INSTRUCTOR,
    duration: "40 min", 
    tag: "new",
    thumbnailSrc: "/placeholders/thumb-1.jpg"
  },
  {
    title: "Upper Body Burn",
    coach: PRIMARY_INSTRUCTOR,
    duration: "35 min",
    tag: "strength",
    thumbnailSrc: "/placeholders/thumb-1.jpg"
  },
  {
    title: "Evening Meditation",
    coach: PRIMARY_INSTRUCTOR,
    duration: "25 min", 
    tag: "meditation",
    thumbnailSrc: "/placeholders/thumb-2.jpg"
  },
  {
    title: "Lunch Break Flow",
    coach: PRIMARY_INSTRUCTOR,
    duration: "12 min",
    tag: "quick",
    thumbnailSrc: "/placeholders/thumb-1.jpg"
  },
  {
    title: "Foundation Series",
    coach: PRIMARY_INSTRUCTOR,
    duration: "50 min",
    tag: "new",
    thumbnailSrc: "/placeholders/thumb-2.jpg"
  },
  {
    title: "Morning Stretch",
    coach: PRIMARY_INSTRUCTOR,
    duration: "25 min",
    tag: "meditation",
    thumbnailSrc: "/placeholders/thumb-1.jpg"
  },
  {
    title: "Power Flow",
    coach: PRIMARY_INSTRUCTOR,
    duration: "35 min",
    tag: "strength",
    thumbnailSrc: "/placeholders/thumb-2.jpg"
  }
]

export default function ClassGrid({ activeTag, limit }: ClassGridProps) {
  // Filter classes based on activeTag
  const filteredClasses = activeTag === 'all' 
    ? demoClasses 
    : demoClasses.filter(classItem => classItem.tag === activeTag)

  // Apply limit if provided (for featured slices)
  const displayClasses = limit 
    ? filteredClasses.slice(0, limit)
    : filteredClasses

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayClasses.map((classItem, index) => (
        <ClassCard 
          key={`${classItem.tag}-${classItem.title}-${index}`}
          {...classItem} 
        />
      ))}
    </div>
  )
}