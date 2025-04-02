import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";

const EditProfile = ({ setIsEditing }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Họ và tên</Label>
          <Input id="fullName" name="fullName" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Số điện thoại</Label>
          <Input id="phone" name="phone" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Địa chỉ</Label>
        <Textarea id="address" name="address" rows={3} />
      </div>

      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={() => setIsEditing(false)}>
          Hủy
        </Button>
        <Button className="gap-2">
          <Save size={16} />
          Lưu thay đổi
        </Button>
      </div>
    </div>
  );
};

export default EditProfile;
