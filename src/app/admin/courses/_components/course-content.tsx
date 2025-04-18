import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import TiptapEditor  from "@/components/editor/tiptap-editor";

interface CourseContentProps {
  form: UseFormReturn<any>;
}

const CourseContent = ({ form }: CourseContentProps) => {
  return (
    <FormField
      control={form.control}
      name="content"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Course Content</FormLabel>
          <FormControl>
            <TiptapEditor onChange={field.onChange} value={field.value} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CourseContent;
