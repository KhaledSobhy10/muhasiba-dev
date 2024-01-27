import { Category } from "@/types";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { addCategory, useTaskDispatch } from "@/context/TaskContext";
import { useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";

type Props = {};

export default function CreateCategory({}: Props) {
  const { toast } = useToast();

  const dispatch = useTaskDispatch();

  const [formData, setFormData] = useState<Category>({
    id: "",
    title: "",
    description: "",
    maxScore: 0,
    currentScore: 0,
    tasks: [],
    priority: 1,
  });

  useEffect(() => {
    if (formData) validateForm();
  }, [formData]);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = "يرجى إدخال عنوان الفئة";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddCategory = () => {
    if (validateForm()) {
      formData.id = Math.random().toFixed(4);
      addCategory(dispatch, formData);
      toast({
        description: `تم اضافة ${formData.title}`,
      });
      setFormData({
        id: "",
        title: "",
        description: "",
        maxScore: 0,
        currentScore: 0,
        tasks: [],
        priority: 1,
      });
      return true;
    } else return false;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
         اضافة
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>اضافة نوع جديد</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              العنوان
            </Label>
            <div className="col-span-3">
              <Input
                id="title"
                placeholder="الصلاة"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              الوصف
            </Label>
            <Textarea
              id="description"
              placeholder="كل شئ متعلق بصلاة"
              className="col-span-3"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose
            asChild
            onClick={(e) => {
              if (!handleAddCategory()) e.preventDefault();
            }}
          >
            <Button>حفظ</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
