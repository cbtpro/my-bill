# 初始化mysql数据库

- 创建数据库

```sql
CREATE SCHEMA `my_bill` DEFAULT CHARACTER SET utf8mb4;
```

- 创建用户，并授权仅访问my_bill，授权除授权外的所有权限。
