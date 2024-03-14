---
sidebar_position: 1
title: Intro
---

# DS

## Transaction

- groups set of tasks into single execution unit (if one of them fails, the entire transaction fails)
- can only result in failure or success

## Procedure vs. Function

| -                                              | Stored Procedure    | Function                                          |
|------------------------------------------------|---------------------|---------------------------------------------------|
| Returns                                        | Zero or more values | A single value (which may be a scalar or a table) |
| Can use transaction?                           | Yes                 | No                                                |
| Can output to parameters?                      | Yes                 | No                                                |
| Can call each other?                           | Can call a function | Cannot call a stored procedure                    |
| Usable in SELECT, WHERE and HAVING statements? | No                  | Yes                                               |
| Supports exception handling (via try/catch)?   | Yes                 | No                                                |