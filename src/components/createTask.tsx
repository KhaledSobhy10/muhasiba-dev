import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { addTaskToCategory, useTaskDispatch } from "@/context/TaskContext";
import { useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";

type Props = { categoryId: string };

export default function CreateTask({ categoryId }: Props) {
  const dispatch = useTaskDispatch();
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [score, setScore] = useState("1");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleValidation = () => {
    let isValid = true;
    const newErrors: { [key: string]: string } = {};

    // Validate title
    if (!title.trim()) {
      newErrors.title = "العنوان مطلوب";
      isValid = false;
    }

    // Validate score
    if (!score.trim() || isNaN(Number(score)) || Number(score) < 1) {
      newErrors.score = "الدرجة يجب أن تكون رقم صحيح أكبر من صفر";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAddTask = () => {
    if (handleValidation()) {
      const newTask = {
        id: `${Date.now()}`, // Replace with your logic for generating IDs
        title: title.trim(),
        description: description.trim(),
        score: Number(score),
        completed: false,
        priority: 1, // Set your desired priority
      };

      addTaskToCategory(dispatch, categoryId, newTask);
      toast({
        description: ` تم إضافة مهمة ${title}`,
      });
      setTitle("");
      setDescription("");
      setScore("1");
      return true;
    } else return false;
  };
  useEffect(() => {
    handleValidation();
  }, [title, score]);


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">إضافة</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>إضافة مهمة</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              العنوان
            </Label>
            <div className="col-span-3">
              <Input
                id="title"
                placeholder="الصلاة في وقتها"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.title}
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              الوصف
            </Label>
            <Textarea
              id="description"
              placeholder="الصلاة في وقتها في المسجد ان امكن"
              className="col-span-3"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="score" className="text-right">
              الدرجة
            </Label>
            <div className="col-span-3">
              <Input
                id="score"
                placeholder="5"
                min={1}
                type="number"
                value={score}
                onChange={(e) => setScore(e.target.value)}
              />
              {errors.score && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.score}
                </span>
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose
            asChild
            onClick={(e) => {
              if (!handleAddTask()) e.preventDefault();
            }}
          >
            <Button>حفظ</Button>
          </DialogClose>{" "}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
