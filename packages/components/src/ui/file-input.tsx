import { ChangeEvent, useState } from "react";
import { ControllerRenderProps, FieldName, FieldValues } from "react-hook-form";
import { InputProps, Input } from "./input";
import { Button } from "./button";
import { Trash2 } from "lucide-react";

interface FileInputProps<FormValues extends FieldValues> extends InputProps {
  name: FieldName<FormValues>;
  field: ControllerRenderProps<FormValues>;
}

export function FileInput<FormValues extends FieldValues>({
  field,
  ...props
}: FileInputProps<FormValues>) {
  const [file, setFile] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(reader.result as string);
        setFileName(file.name);
        field.onChange(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveClick = () => {
    setFile(null);
  };

  if (file) {
    return (
      <Input asChild>
        <div className="justify-between items-center">
          {fileName}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleRemoveClick}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </Input>
    );
  }

  return <Input type="file" onChange={handleFileChange} {...props} />;
}